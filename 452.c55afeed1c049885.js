"use strict";(self.webpackChunkngx_cocktail_view_animations=self.webpackChunkngx_cocktail_view_animations||[]).push([[452],{4452:(D,s,i)=>{i.r(s),i.d(s,{default:()=>A});var c=i(6814),t=i(4946),a=i(156),l=i(9459),d=i(7327);let u=(()=>{class o{static ngTemplateContextGuard(e,r){return!0}constructor(e,r){this.context={cwLet:void 0},e.createEmbeddedView(r,this.context)}set cwLet(e){this.context.cwLet=e}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.s_b),t.Y36(t.Rgc))},o.\u0275dir=t.lG2({type:o,selectors:[["","cwLet",""]],inputs:{cwLet:"cwLet"},standalone:!0}),o})();var p=i(6616),g=i(5429),m=i(5619),v=i(2181),x=i(4664),h=i(6306),y=i(2096),C=i(7921);function k(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"button",6),t.NdJ("click",function(){const Z=t.CHM(e).$implicit,F=t.oxw(2);return t.KtG(F.chooseLetter(Z))}),t._uU(1),t.qZA()}if(2&o){const e=n.$implicit,r=t.oxw().cwLet;t.ekj("active",r===e),t.xp6(1),t.hij(" ",e," ")}}function b(o,n){if(1&o&&(t.TgZ(0,"div",4),t.YNc(1,k,2,3,"button",5),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.alphabet)}}const w=function(o){return[o]},L=function(o){return["cocktails",o]};function T(o,n){if(1&o&&(t.ynx(0),t.TgZ(1,"a",7)(2,"div",8),t._UZ(3,"img",9),t.ALo(4,"cleanUrl"),t.qZA(),t.TgZ(5,"div",10)(6,"p",11),t._uU(7),t.qZA()()(),t.BQk()),2&o){const e=n.$implicit;t.xp6(1),t.Q6J("routerLink",t.VKq(7,w,e.idDrink))("vwtRepeatedTransitionContainer",t.VKq(9,L,e.idDrink)),t.xp6(2),t.s9C("src",t.lcZ(4,5,e.strDrinkThumb),t.LSH),t.Q6J("alt",e.strDrink),t.xp6(4),t.hij(" ",e.strDrink," ")}}let A=(()=>{class o{constructor(){this.initiallyActivatedRoute=(0,t.f3M)(a.gz).snapshot,this.cocktailApiService=(0,t.f3M)(l.z),this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),this.letter$=new m.X(this.initiallyActivatedRoute.queryParams.letter||"A"),this.items$=this.letter$.pipe(function f(o){return(0,v.h)((n,e)=>o<=e)}(1),(0,x.w)(e=>this.cocktailApiService.listCocktailsByFirstLetter(e).pipe((0,h.K)(()=>(0,y.of)([])))),(0,C.O)(this.initiallyActivatedRoute.data.items))}chooseLetter(e){this.letter$.next(e)}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["ngx-cocktail-view-animations-cocktails"]],standalone:!0,features:[t.jDz],decls:6,vars:6,consts:[["class","flex flex-wrap rounded-md shadow-sm","role","group",4,"cwLet"],[1,"container","m-auto","p-6"],[1,"grid","sm:grid-cols-2","lg:grid-cols-4","gap-6","mb-10","lg:mb-14"],[4,"ngFor","ngForOf"],["role","group",1,"flex","flex-wrap","rounded-md","shadow-sm"],["type","button","class","flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700",3,"active","click",4,"ngFor","ngForOf"],["type","button",1,"flex-1","px-4","py-2","text-sm","font-medium","text-gray-900","bg-white","border","border-gray-200","rounded-l-lg","hover:bg-gray-100","hover:text-blue-700","focus:z-10","focus:ring-2","focus:ring-blue-700","focus:text-blue-700",3,"click"],[1,"group","flex","flex-col","bg-white","border","shadow-sm","rounded-xl","hover:shadow-md","transition","dark:bg-slate-900","dark:border-gray-800",3,"routerLink","vwtRepeatedTransitionContainer"],[1,"aspect-w-16","aspect-h-9"],["vwtTransitionName","cocktail-img",1,"w-full","object-cover","rounded-t-xl",3,"src","alt"],[1,"p-4","md:p-5"],["vwtTransitionName","cocktail-name",1,"mt-2","text-xs","uppercase","text-gray-600","dark:text-gray-400"]],template:function(e,r){1&e&&(t.YNc(0,b,2,1,"div",0),t.ALo(1,"async"),t.TgZ(2,"div",1)(3,"div",2),t.YNc(4,T,8,11,"ng-container",3),t.ALo(5,"async"),t.qZA()()),2&e&&(t.Q6J("cwLet",t.lcZ(1,2,r.letter$)),t.xp6(4),t.Q6J("ngForOf",t.lcZ(5,4,r.items$)))},dependencies:[c.ez,c.sg,c.Ov,a.rH,d.s,p.F,g.Y,u],styles:[".active[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgb(245 158 11 / var(--tw-bg-opacity))}"]}),o})()}}]);