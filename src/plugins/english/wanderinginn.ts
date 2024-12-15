import { defaultCover } from '@libs/defaultCover';
import { fetchApi } from '@libs/fetch';
import { Plugin } from '@typings/plugin';
import { load as parseHTML } from 'cheerio';

class WanderingInnPlugin implements Plugin.PluginBase {
  id = 'net.zegnat.lnreader.wanderinginn';
  name = 'The Wandering Inn';
  site = 'https://wanderinginn.com/';
  version = '1.0.0';
  icon = 'src/en/wanderinginn/icon.png';

  allNovelsCache: readonly (readonly [string, string, string])[] | undefined;
  novelItemCache = new Map<string, Required<Plugin.NovelItem>>();

  /**
   * Safely extract the pathname from any URL on {@link site}.
   *
   * @private
   */
  getPath(url: string | undefined): string | undefined {
    if (url === undefined || !url.startsWith(this.site)) {
      return undefined;
    }
    const trimmed = url.substring(this.site.length).replace(/(^\/+|\/+$)/g, '');
    if (trimmed.length === 0) {
      return undefined;
    }
    return trimmed;
  }

  /**
   * Preloaded map of cover URLs. This saves on an extra request per book.
   *
   * @private
   */
  covers(path: string): string {
    switch (path) {
      case 'book/the-wandering-inn':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book1.png';
      case 'book/fae-and-fare':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book2.png';
      case 'book/flowers-of-esthelm':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book3.png';
      case 'book/winter-solstice':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book4.png';
      case 'book/the-last-light':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book5.png';
      case 'book/the-general-of-izril':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book6.png';
      case 'book/the-rains-of-liscor':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book7.png';
      case 'book/blood-of-liscor':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book8.jpg';
      case 'book/tears-of-liscor':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book9.jpg';
      case 'book/the-wind-runner':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/07/Wandering_Inn-Vol10-eCover-Layered_v2.jpg';
      case 'book/the-titan-of-baleros':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/11/B11_TheTitanOfBaleros_TheWanderingInn.jpg';
      case 'book/the-witch-of-webs':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2024/07/Wandering_Inn-Vol12-eCover.jpg';
      case 'book/the-empress-of-beasts':
        return 'https://i0.wp.com/wanderinginn.com/wp-content/uploads/2024/07/B9TJ.jpg';
      default:
        return defaultCover;
    }
  }

  async popularNovels(pageNo: number): Promise<Plugin.NovelItem[]> {
    if (pageNo !== 1) {
      return [];
    }
    const toc = `${this.site}table-of-contents/?compare=ebook`;
    const tocBody = await fetchApi(toc).then(res => res.text());
    const loadedCheerio = parseHTML(tocBody);
    const ebooks = loadedCheerio('#main')
      .find('a.book-title-num')
      .map((_, anchorEl) => {
        const el = loadedCheerio(anchorEl);
        const path = this.getPath(el.attr('href'));
        if (path === undefined) {
          return undefined;
        }
        const name = el.next().text().trim();
        const number = el.text().trim();
        return { name: `${name} (${number})`, path, cover: this.covers(path) };
      })
      .toArray();
    return [
      { name: 'Volume 1 Archive', path: 'vol-1-archive', cover: defaultCover },
      {
        name: 'The Wandering Inn: Web Serial',
        path: 'web',
        cover: defaultCover,
      },
      ...ebooks,
    ];
  }

  /**
   * Sub implementation of parseNovel that only parses the hard-coded archived
   * novel page into a chapter list.
   *
   * @private
   */
  async parseArchivedNovel(): Promise<Plugin.SourceNovel> {
    const novel = `https://wanderinginn.com/vol-1-archive/`;
    const novelBody = await fetchApi(novel).then(res => res.text());
    const novelCheerio = parseHTML(novelBody);
    const chapters = novelCheerio('.entry-content')
      .find('p[style]')
      .first()
      .find('a')
      .map((_, anchorEl): Plugin.ChapterItem | undefined => {
        const chapter = novelCheerio(anchorEl);
        const chapterPath = this.getPath(chapter.attr('href'));
        if (chapterPath === undefined) {
          return undefined;
        }
        return {
          name: chapter.text().trim(),
          path: chapterPath,
        };
      })
      .toArray();
    return {
      name: 'Volume 1 Archive',
      path: 'vol-1-archive',
      cover: defaultCover,
      chapters,
    };
  }

  /**
   * Sub implementation of parseNovel that only parses the hard-coded ongoing
   * web novel into a chapter list.
   *
   * @private
   */
  async parseWebNovel(): Promise<Plugin.SourceNovel> {
    const toc = `${this.site}table-of-contents/`;
    const tocBody = await fetchApi(toc).then(res => res.text());
    const tocCheerio = parseHTML(tocBody);
    const chapters = tocCheerio('.chapter-entry .body-web a')
      .map((_, anchorEl) => {
        const chapter = tocCheerio(anchorEl);
        const chapterPath = this.getPath(chapter.attr('href'));
        if (chapterPath === undefined) {
          return undefined;
        }
        return {
          name: chapter.text().trim(),
          path: chapterPath,
        };
      })
      .toArray();
    return {
      name: 'The Wandering Inn: Web Serial',
      path: 'web',
      cover: defaultCover,
      chapters,
    };
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    if (novelPath === 'vol-1-archive') {
      return this.parseArchivedNovel();
    }
    if (novelPath === 'web') {
      return this.parseWebNovel();
    }
    const novel = `${this.site}${novelPath}`;
    const novelBody = await fetchApi(novel).then(res => res.text());
    const novelCheerio = parseHTML(novelBody);
    const el = novelCheerio('h1.book-title');
    const name = el.next().text().trim();
    const number = el.text().trim();
    const toc = `${this.site}table-of-contents/?compare=ebook`;
    const tocBody = await fetchApi(toc).then(res => res.text());
    const tocCheerio = parseHTML(tocBody);
    const chapters = tocCheerio('.book-wrapper')
      .map((_, divEl) => {
        const bookWrapper = tocCheerio(divEl);
        const wrappedBook = this.getPath(
          bookWrapper.find('a.book-title-num').first().attr('href'),
        );
        if (wrappedBook !== novelPath) {
          return undefined;
        }
        return bookWrapper
          .find('.chapter-entry')
          .map((_, divEl): Plugin.ChapterItem | undefined => {
            const chapterWrapper = tocCheerio(divEl);
            const chapterPath = this.getPath(
              chapterWrapper.find('a').first().attr('href'),
            );
            const chapterTitle = chapterWrapper
              .find('.body-ebook')
              .first()
              .text()
              .trim();
            console.log({ chapterPath });
            if (chapterPath === undefined || chapterTitle === '') {
              return undefined;
            }
            console.log({ chapterPath });
            return {
              name: chapterTitle,
              path: chapterPath,
            };
          })
          .toArray();
      })
      .toArray();
    return {
      name: `${name} (${number})`,
      path: novelPath,
      cover: this.covers(novelPath),
      summary: novelCheerio('.book-content').text() ?? undefined,
      chapters,
    };
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const slug = chapterPath.replace(/^\d{4}\/\d{2}\/\d{2}\//, '');
    const chapterLink = `${this.site}wp-json/wp/v2/posts?slug=${slug}`;
    const chapter = await fetchApi(chapterLink).then(res => res.json());
    if (chapter.length !== 1) {
      return '';
    }
    const title = `<h1>${chapter[0].title.rendered}</h1>`;
    const content = chapter[0].content.rendered;
    return `${title}${content}`;
  }

  async searchNovels(
    searchTerm: string,
    pageNo: number,
  ): Promise<Plugin.NovelItem[]> {
    if (pageNo !== 1) {
      return [];
    }
    return this.popularNovels(pageNo);
  }
}

export default new WanderingInnPlugin();
