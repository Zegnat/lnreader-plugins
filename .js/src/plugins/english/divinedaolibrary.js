var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}c((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("@libs/defaultCover"),r=require("@libs/fetch"),i=require("@libs/filterInputs"),o=require("cheerio"),a=function(){function a(){this.id="net.zegnat.lnreader.ddl",this.name="Divine Dao Library",this.site="https://www.divinedaolibrary.com/",this.version="1.1.1",this.icon="src/en/divinedaolibrary/icon.png",this.filters={category:{type:i.FilterTypes.CheckboxGroup,label:"State",value:["Completed","Translating","Lost in Voting Poll","Dropped"],options:[{label:"Completed",value:"Completed"},{label:"Translating",value:"Translating"},{label:"Lost in Voting Poll",value:"Lost in Voting Poll"},{label:"Dropped",value:"Dropped"},{label:"Personally Written",value:"Personally Written"}]}},this.novelItemCache=new Map}return a.prototype.getPath=function(t){if(t.startsWith(this.site)){var e=t.substring(this.site.length).replace(/(^\/+|\/+$)/g,"");if(0!==e.length)return e}},a.prototype.asyncMap=function(n,r){return t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,Promise.allSettled(n.map(r))];case 1:return[2,t.sent().filter((function(t){return"fulfilled"===t.status&&void 0!==t.value})).map((function(t){return t.value}))]}}))}))},a.prototype.findLatestChapter=function(n){return t(this,void 0,void 0,(function(){var t,i,o,a,s;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"wp-json/wp/v2/categories?slug=").concat(n),[4,(0,r.fetchApi)(t).then((function(t){return t.json()}))];case 1:return 1!==(i=e.sent()).length?[2,void 0]:(o=i[0].id,a="".concat(this.site,"wp-json/wp/v2/posts?categories=").concat(o,"&per_page=1"),[4,(0,r.fetchApi)(a).then((function(t){return t.json()}))]);case 2:return 1!==(s=e.sent()).length?[2,void 0]:[2,s[0].slug]}}))}))},a.prototype.grabNovel=function(i){return t(this,arguments,void 0,(function(t,i){var a,s,c,l,u,h,p,f,v,d,b=this;return void 0===i&&(i=!1),e(this,(function(e){switch(e.label){case 0:return a="".concat(this.site,"wp-json/wp/v2/pages?slug=").concat(t),[4,(0,r.fetchApi)(a).then((function(t){return t.json()}))];case 1:return 1!==(s=e.sent()).length?[2,void 0]:(c=(0,o.load)(s[0].content.rendered),l=(0,o.load)(s[0].excerpt.rendered),u=c("img").first(),h=[],i?(p=c("li > span > a").map((function(t,e){var n=b.getPath(e.attribs.href);if(n)return{name:c(e).text(),path:n}})).toArray(),[4,this.findLatestChapter(t)]):[3,3]);case 2:f=e.sent(),h=f?p.slice(0,1+p.findIndex((function(t){return t.path===f}))):p,e.label=3;case 3:return[2,{name:s[0].title.rendered,path:t,cover:null!==(d=null!==(v=u.attr("data-lazy-src"))&&void 0!==v?v:u.attr("src"))&&void 0!==d?d:n.defaultCover,author:c("h3").first().text().replace(/^Author:\s*/g,""),summary:l("p").first().text().replace(/^.+Description\s*/g,""),chapters:h}]}}))}))},a.prototype.grabCachedNovel=function(n){return t(this,void 0,void 0,(function(){var t,r,i;return e(this,(function(e){switch(e.label){case 0:return(t=this.novelItemCache.get(n))?[2,t]:[4,this.grabNovel(n,!1)];case 1:return void 0===(r=e.sent())?[2,void 0]:(i={name:r.name,path:r.path,cover:r.cover},this.novelItemCache.set(n,i),[2,i])}}))}))},a.prototype.grabCachedNovels=function(){return t(this,void 0,void 0,(function(){var t,n,i,a=this;return e(this,(function(e){switch(e.label){case 0:return this.allNovelsCache?[2,this.allNovelsCache]:[4,(0,r.fetchApi)(this.site+"novels").then((function(t){return t.text()}))];case 1:return t=e.sent(),n=(0,o.load)(t),i=n(".entry-content ul").map((function(t,e){var r=n(e),i=r.prev().text();return r.find("a").map((function(t,e){var r=a.getPath(e.attribs.href);if(r){var o=n(e).text();return[[i,o,r]]}})).toArray()})).toArray(),this.allNovelsCache=i,[2,i]}}))}))},a.prototype.latestNovels=function(){return t(this,void 0,void 0,(function(){var t,n,i,a,s=this;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)(this.site).then((function(t){return t.text()}))];case 1:return t=e.sent(),n=(0,o.load)(t),i=n("#main").find('a[rel="category tag"]').map((function(t,e){return s.getPath(e.attribs.href)})).toArray(),a=new Set(i),[2,Array.from(a)]}}))}))},a.prototype.allNovels=function(n){return t(this,void 0,void 0,(function(){var t;return e(this,(function(e){switch(e.label){case 0:return[4,this.grabCachedNovels()];case 1:return(t=e.sent())?[2,t.filter((function(t){var e=t[0];return n.value.includes(e)})).map((function(t){return t[2]}))]:[2,[]]}}))}))},a.prototype.popularNovels=function(n,r){return t(this,void 0,void 0,(function(){var t,i;return e(this,(function(e){switch(e.label){case 0:return 1!==n?[2,[]]:(t=r.showLatestNovels?this.latestNovels():this.allNovels(r.filters.category),i=this.asyncMap,[4,t]);case 1:return[4,i.apply(this,[e.sent(),this.grabCachedNovel.bind(this)])];case 2:return[2,e.sent()]}}))}))},a.prototype.parseNovel=function(n){return t(this,void 0,void 0,(function(){var t;return e(this,(function(e){switch(e.label){case 0:return[4,this.grabNovel(n,!0)];case 1:if(void 0===(t=e.sent()))throw new Error('The path "'.concat(n,'" could not be resolved.'));return[2,t]}}))}))},a.prototype.parseChapter=function(n){return t(this,void 0,void 0,(function(){var t,i,o,a;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"wp-json/wp/v2/posts?slug=").concat(n),[4,(0,r.fetchApi)(t).then((function(t){return t.json()}))];case 1:return 1!==(i=e.sent()).length?[2,""]:(o="<h1>".concat(i[0].title.rendered,"</h1>"),a=i[0].content.rendered,[2,"".concat(o).concat(a)])}}))}))},a.prototype.searchNovels=function(n,r){return t(this,void 0,void 0,(function(){var t,i,o;return e(this,(function(e){switch(e.label){case 0:return 1!==r?[2,[]]:[4,this.grabCachedNovels()];case 1:return(t=e.sent())?(i=t.filter((function(t){return t[1].toLocaleLowerCase().includes(n.toLocaleLowerCase())})).map((function(t){return t[2]})),o=this.asyncMap,[4,i]):[2,[]];case 2:return[4,o.apply(this,[e.sent(),this.grabCachedNovel.bind(this)])];case 3:return[2,e.sent()]}}))}))},a}();exports.default=new a;