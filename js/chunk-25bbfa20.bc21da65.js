(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25bbfa20"],{2248:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n("0967");function a(){if(void 0!==window.getSelection){var t=window.getSelection();void 0!==t.empty?t.empty():void 0!==t.removeAllRanges&&(t.removeAllRanges(),!0!==i["b"].is.mobile&&t.addRange(document.createRange()))}else void 0!==document.selection&&document.selection.empty()}},"463c":function(t,e,n){"use strict";e["a"]={methods:{__nextTick:function(t){this.__tickFn=t},__prepareTick:function(){var t=this;if(void 0!==this.__tickFn){var e=this.__tickFn;this.$nextTick((function(){t.__tickFn===e&&(t.__tickFn(),t.__tickFn=void 0)}))}},__clearTick:function(){this.__tickFn=void 0},__setTimeout:function(t,e){clearTimeout(this.__timer),this.__timer=setTimeout(t,e)},__clearTimeout:function(){clearTimeout(this.__timer)}},beforeDestroy:function(){this.__tickFn=void 0,clearTimeout(this.__timer)}}},"93dc":function(t,e){t.exports=function(t,e,n){var i;if("function"===typeof t.exports?(i=t.exports.extendOptions,i[e]=t.exports.options[e]):i=t.options,void 0===i[e])i[e]=n;else{var a=i[e];for(var o in n)void 0===a[o]&&(a[o]=n[o])}}},aa2c:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[n("q-tabs",{staticClass:"text-grey shadow-2",attrs:{dense:"",align:"left","active-color":"primary",breakpoint:0},on:{input:t.changeTab},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("q-tab",{attrs:{name:"ViewIndex",label:"總攬"}}),n("q-tab",{attrs:{name:"ShowList",label:"查看金額資訊"}})],1),n("q-separator"),n("q-tab-panels",{attrs:{animated:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("q-tab-panel",{attrs:{name:t.tab}},[n("router-view")],1)],1)],1)},a=[],o=(n("b0c0"),{data:function(){return{tab:this.$route.name}},methods:{changeTab:function(t){this.$router.push({name:t})}}}),c=o,s=n("2877"),r=n("429b"),u=n("7460"),l=n("eb85"),d=n("adad"),b=n("823b"),_=n("93dc"),f=n.n(_),p=Object(s["a"])(c,i,a,!1,null,null,null);e["default"]=p.exports;f()(p,"components",{QTabs:r["a"],QTab:u["a"],QSeparator:l["a"],QTabPanels:d["a"],QTabPanel:b["a"]})},b7fa:function(t,e,n){"use strict";e["a"]={props:{dark:{type:Boolean,default:null}},computed:{isDark:function(){return null===this.dark?this.$q.dark.isActive:this.dark}}}}}]);