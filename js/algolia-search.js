window.addEventListener("DOMContentLoaded",()=>{const algoliaSettings=CONFIG.algolia;let search=instantsearch({appId:algoliaSettings.appID,apiKey:algoliaSettings.apiKey,indexName:algoliaSettings.indexName,searchFunction:helper=>{document.querySelector("#search-input input").value&&helper.search()}});window.pjax&&search.on("render",()=>{window.pjax.refresh(document.getElementById("algolia-hits"))}),[instantsearch.widgets.searchBox({container:"#search-input",placeholder:algoliaSettings.labels.input_placeholder}),instantsearch.widgets.stats({container:"#algolia-stats",templates:{body:data=>{return`${algoliaSettings.labels.hits_stats.replace(/\$\{hits}/,data.nbHits).replace(/\$\{time}/,data.processingTimeMS)}\n            <span class="algolia-powered">\n              <img src="${CONFIG.root}images/algolia_logo.svg" alt="Algolia">\n            </span>\n            <hr>`}}}),instantsearch.widgets.hits({container:"#algolia-hits",hitsPerPage:algoliaSettings.hits.per_page||10,templates:{item:data=>{return`<a href="${data.permalink?data.permalink:CONFIG.root+data.path}" class="algolia-hit-item-link">${data._highlightResult.title.value}</a>`},empty:data=>`<div id="algolia-hits-empty">\n              ${algoliaSettings.labels.hits_empty.replace(/\$\{query}/,data.query)}\n            </div>`},cssClasses:{item:"algolia-hit-item"}}),instantsearch.widgets.pagination({container:"#algolia-pagination",scrollTo:!1,showFirstLast:!1,labels:{first:'<i class="fa fa-angle-double-left"></i>',last:'<i class="fa fa-angle-double-right"></i>',previous:'<i class="fa fa-angle-left"></i>',next:'<i class="fa fa-angle-right"></i>'},cssClasses:{root:"pagination",item:"pagination-item",link:"page-number",active:"current",disabled:"disabled-item"}})].forEach(search.addWidget,search),search.start(),document.querySelector(".popup-trigger").addEventListener("click",()=>{document.body.style.overflow="hidden",document.querySelector(".search-pop-overlay").style.display="block",document.querySelector(".popup").style.display="block",document.querySelector("#search-input input").focus()});const onPopupClose=()=>{document.body.style.overflow="",document.querySelector(".search-pop-overlay").style.display="none",document.querySelector(".popup").style.display="none"};document.querySelector(".search-pop-overlay").addEventListener("click",onPopupClose),document.querySelector(".popup-btn-close").addEventListener("click",onPopupClose),window.addEventListener("pjax:success",onPopupClose),window.addEventListener("keyup",event=>{27===event.which&&onPopupClose()})});