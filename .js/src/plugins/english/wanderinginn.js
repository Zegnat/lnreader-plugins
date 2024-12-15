var t=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function a(t){try{s(o.next(t))}catch(t){i(t)}}function c(t){try{s(o.throw(t))}catch(t){i(t)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}s((o=o.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(s){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(n=1,o&&(r=2&c[0]?o.return:c[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,c[1])).done)return r;switch(o=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,o=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){a.label=c[1];break}if(6===c[0]&&a.label<r[1]){a.label=r[1],r=c;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(c);break}r[2]&&a.ops.pop(),a.trys.pop();continue}c=e.call(t,a)}catch(t){c=[6,t],o=0}finally{n=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}},n=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var o,r=0,i=e.length;r<i;r++)!o&&r in e||(o||(o=Array.prototype.slice.call(e,0,r)),o[r]=e[r]);return t.concat(o||Array.prototype.slice.call(e))};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("@libs/defaultCover"),r=require("@libs/fetch"),i=require("cheerio"),a=function(){function a(){this.id="net.zegnat.lnreader.wanderinginn",this.name="The Wandering Inn",this.site="https://wanderinginn.com/",this.version="1.0.0",this.icon="src/en/wanderinginn/icon.png",this.novelItemCache=new Map}return a.prototype.getPath=function(t){if(void 0!==t&&t.startsWith(this.site)){var e=t.substring(this.site.length).replace(/(^\/+|\/+$)/g,"");if(0!==e.length)return e}},a.prototype.covers=function(t){switch(t){case"book/the-wandering-inn":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book1.png";case"book/fae-and-fare":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book2.png";case"book/flowers-of-esthelm":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book3.png";case"book/winter-solstice":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book4.png";case"book/the-last-light":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book5.png";case"book/the-general-of-izril":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book6.png";case"book/the-rains-of-liscor":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book7.png";case"book/blood-of-liscor":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book8.jpg";case"book/tears-of-liscor":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/06/book9.jpg";case"book/the-wind-runner":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/07/Wandering_Inn-Vol10-eCover-Layered_v2.jpg";case"book/the-titan-of-baleros":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2023/11/B11_TheTitanOfBaleros_TheWanderingInn.jpg";case"book/the-witch-of-webs":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2024/07/Wandering_Inn-Vol12-eCover.jpg";case"book/the-empress-of-beasts":return"https://i0.wp.com/wanderinginn.com/wp-content/uploads/2024/07/B9TJ.jpg";default:return o.defaultCover}},a.prototype.popularNovels=function(a){return t(this,void 0,void 0,(function(){var t,c,s,u,p=this;return e(this,(function(e){switch(e.label){case 0:return 1!==a?[2,[]]:(t="".concat(this.site,"table-of-contents/?compare=ebook"),[4,(0,r.fetchApi)(t).then((function(t){return t.text()}))]);case 1:return c=e.sent(),s=(0,i.load)(c),u=s("#main").find("a.book-title-num").map((function(t,e){var n=s(e),o=p.getPath(n.attr("href"));if(void 0!==o){var r=n.next().text().trim(),i=n.text().trim();return{name:"".concat(r," (").concat(i,")"),path:o,cover:p.covers(o)}}})).toArray(),[2,n([{name:"Volume 1 Archive",path:"vol-1-archive",cover:o.defaultCover},{name:"The Wandering Inn: Web Serial",path:"web",cover:o.defaultCover}],u,!0)]}}))}))},a.prototype.parseArchivedNovel=function(){return t(this,void 0,void 0,(function(){var t,n,a,c=this;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)("https://wanderinginn.com/vol-1-archive/").then((function(t){return t.text()}))];case 1:return t=e.sent(),n=(0,i.load)(t),a=n(".entry-content").find("p[style]").first().find("a").map((function(t,e){var o=n(e),r=c.getPath(o.attr("href"));if(void 0!==r)return{name:o.text().trim(),path:r}})).toArray(),[2,{name:"Volume 1 Archive",path:"vol-1-archive",cover:o.defaultCover,chapters:a}]}}))}))},a.prototype.parseWebNovel=function(){return t(this,void 0,void 0,(function(){var t,n,a,c,s=this;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"table-of-contents/"),[4,(0,r.fetchApi)(t).then((function(t){return t.text()}))];case 1:return n=e.sent(),a=(0,i.load)(n),c=a(".chapter-entry .body-web a").map((function(t,e){var n=a(e),o=s.getPath(n.attr("href"));if(void 0!==o)return{name:n.text().trim(),path:o}})).toArray(),[2,{name:"The Wandering Inn: Web Serial",path:"web",cover:o.defaultCover,chapters:c}]}}))}))},a.prototype.parseNovel=function(n){return t(this,void 0,void 0,(function(){var t,o,a,c,s,u,p,h,l,f,d,v=this;return e(this,(function(e){switch(e.label){case 0:return"vol-1-archive"===n?[2,this.parseArchivedNovel()]:"web"===n?[2,this.parseWebNovel()]:(t="".concat(this.site).concat(n),[4,(0,r.fetchApi)(t).then((function(t){return t.text()}))]);case 1:return o=e.sent(),a=(0,i.load)(o),c=a("h1.book-title"),s=c.next().text().trim(),u=c.text().trim(),p="".concat(this.site,"table-of-contents/?compare=ebook"),[4,(0,r.fetchApi)(p).then((function(t){return t.text()}))];case 2:return h=e.sent(),l=(0,i.load)(h),f=l(".book-wrapper").map((function(t,e){var o=l(e);if(v.getPath(o.find("a.book-title-num").first().attr("href"))===n)return o.find(".chapter-entry").map((function(t,e){var n=l(e),o=v.getPath(n.find("a").first().attr("href")),r=n.find(".body-ebook").first().text().trim();if(console.log({chapterPath:o}),void 0!==o&&""!==r)return console.log({chapterPath:o}),{name:r,path:o}})).toArray()})).toArray(),[2,{name:"".concat(s," (").concat(u,")"),path:n,cover:this.covers(n),summary:null!==(d=a(".book-content").text())&&void 0!==d?d:void 0,chapters:f}]}}))}))},a.prototype.parseChapter=function(n){return t(this,void 0,void 0,(function(){var t,o,i,a,c;return e(this,(function(e){switch(e.label){case 0:return t=n.replace(/^\d{4}\/\d{2}\/\d{2}\//,""),o="".concat(this.site,"wp-json/wp/v2/posts?slug=").concat(t),[4,(0,r.fetchApi)(o).then((function(t){return t.json()}))];case 1:return 1!==(i=e.sent()).length?[2,""]:(a="<h1>".concat(i[0].title.rendered,"</h1>"),c=i[0].content.rendered,[2,"".concat(a).concat(c)])}}))}))},a.prototype.searchNovels=function(n,o){return t(this,void 0,void 0,(function(){return e(this,(function(t){return 1!==o?[2,[]]:[2,this.popularNovels(o)]}))}))},a}();exports.default=new a;