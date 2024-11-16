import { defaultCover } from '@libs/defaultCover';
import { fetchApi } from '@libs/fetch';
import { Filters, FilterTypes } from '@libs/filterInputs';
import { NovelStatus } from '@libs/novelStatus';
import { Plugin } from '@typings/plugin';
import { CheerioAPI, load as parseHTML } from 'cheerio';
import type { Text } from 'domhandler';

type Status = (typeof NovelStatus)[keyof typeof NovelStatus];
type CachedNovel = readonly [Status, string, string, string];

class HostedNovelPlugin implements Plugin.PluginBase {
  id = 'net.zegnat.lnreader.hostednovel';
  name = 'Hosted Novel';
  site = 'https://hostednovel.com/';
  version = '0.1.0';
  icon = 'siteNotAvailable.png';

  filters = {
    status: {
      type: FilterTypes.CheckboxGroup,
      label: 'Status',
      value: [NovelStatus.Ongoing, NovelStatus.Completed],
      options: [
        { label: 'Ongoing', value: NovelStatus.Ongoing },
        { label: 'Completed', value: NovelStatus.Completed },
        { label: 'Hiatus', value: NovelStatus.OnHiatus },
        { label: 'Dropped', value: NovelStatus.Cancelled },
      ],
    },
  } satisfies Filters;

  allNovelsCache: readonly CachedNovel[] | undefined;

  getPath(url: string | undefined): string | undefined {
    if (!url || !url.startsWith(this.site)) {
      return undefined;
    }
    const trimmed = url.substring(this.site.length).replace(/(^\/+|\/+$)/g, '');
    if (trimmed.length === 0) {
      return undefined;
    }
    return trimmed;
  }

  toStatus(status: string): Status {
    return (
      {
        'Completed': NovelStatus.Completed,
        'Ongoing': NovelStatus.Ongoing,
        'Hiatus': NovelStatus.OnHiatus,
        'Dropped': NovelStatus.Cancelled,
      }[status] ?? NovelStatus.Unknown
    );
  }

  async grabCachedNovels(): Promise<readonly CachedNovel[]> {
    if (this.allNovelsCache) {
      return this.allNovelsCache;
    }
    const body = await fetchApi(this.site + 'novels').then(res => res.text());
    const loadedCheerio = parseHTML(body);
    const novels = loadedCheerio('ul.grid > li.relative')
      .map((_, listEl) => {
        const novel = loadedCheerio(listEl);
        const path = this.getPath(novel.find('a').first().attr('href'));
        if (!path) return;
        const status = novel.find('span.flex').first().text();
        const lazyCoverPath = novel.find('img').first().attr('data-src');
        const cover = lazyCoverPath
          ? new URL(lazyCoverPath, this.site).toString()
          : defaultCover;
        return [
          [this.toStatus(status), novel.find('p').first().text(), path, cover],
        ] as const;
      })
      .toArray();
    this.allNovelsCache = novels;
    return novels;
  }

  cacheToItem(cache: CachedNovel): Plugin.NovelItem {
    return {
      name: cache[1],
      path: cache[2],
      cover: cache[3],
    };
  }

  async popularNovels(
    pageNo: number,
    options: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    if (pageNo !== 1) {
      return [];
    }
    return (await this.grabCachedNovels())
      .filter(([status]) => options.filters.status.value.includes(status))
      .map(this.cacheToItem);
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const body = await fetchApi(this.site + novelPath).then(res => res.text());
    const loadedCheerio = parseHTML(body);
    const coverPath = loadedCheerio('section img.object-cover')
      .first()
      .attr('src');
    const cover = coverPath
      ? new URL(coverPath, this.site).toString()
      : defaultCover;
    const chapters: Plugin.ChapterItem[] = [];
    const finalPage = loadedCheerio('[aria-label="Pagination"]')
      .first()
      .find('a[href$="#chapters"]')
      .last()
      .attr('href')
      ?.match(/\?page=(\d+)/);
    const finalPageNo = Array.isArray(finalPage)
      ? parseInt(finalPage[1]) || 1
      : 1;
    let page = 1;
    let parsedPage: CheerioAPI | undefined = loadedCheerio;
    while (parsedPage !== undefined) {
      const foundChapters = parsedPage('#chapters .flow-root a.flex')
        .map((_, anchorEl) => {
          const chapterPath = this.getPath(parsedPage!(anchorEl).attr('href'));
          if (!chapterPath) return;
          return {
            name: (
              parsedPage!(anchorEl).find('div > span').first()[0].next as Text
            ).data.trim(),
            path: chapterPath,
          } satisfies Plugin.ChapterItem;
        })
        .toArray();
      chapters.push(...foundChapters);
      if (++page <= finalPageNo) {
        const nextBody = await fetchApi(
          this.site + novelPath + '?page=' + page,
        ).then(res => res.text());
        parsedPage = parseHTML(nextBody);
      } else {
        parsedPage = undefined;
      }
    }
    return {
      name: loadedCheerio('h1').first().text(),
      path: novelPath,
      author: loadedCheerio('dd').first().text(),
      status: this.toStatus(
        loadedCheerio(loadedCheerio('dd').get(2)).text().trim(),
      ),
      genres: loadedCheerio(loadedCheerio('dd').get(4))
        .find('span')
        .map((_, spanEl) => loadedCheerio(spanEl).text())
        .toArray()
        .join(','),
      cover,
      summary: loadedCheerio('.prose').first().text().trim(),
      chapters,
    };
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const chapterLink = `${this.site}${chapterPath}`;
    const body = await fetchApi(chapterLink).then(res => res.text());
    const loadedCheerio = parseHTML(body);
    const title = `<h1>${loadedCheerio('#chapter-title').first().text().trim()}</h1>`;
    const content = loadedCheerio('#chapter-content').html();
    return `${title}${content}`;
  }

  async searchNovels(
    searchTerm: string,
    pageNo: number,
  ): Promise<Plugin.NovelItem[]> {
    if (pageNo !== 1) {
      return [];
    }
    return (await this.grabCachedNovels())
      .filter(([, name]) =>
        name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
      )
      .map(this.cacheToItem);
  }
}

export default new HostedNovelPlugin();
