(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{23:function(e){e.exports=[{buy:70,harvest:{},id:"amaranth",name:"Amaranth",sell:150,growth:7,start:56,end:83},{buy:700,harvest:{},id:"ancient_fruit",name:"Ancient Fruit",sell:550,growth:28,regrowth:7,start:0,end:83},{buy:30,harvest:{},id:"artichoke",name:"Artichoke",sell:160,growth:8,start:56,end:83},{buy:20,harvest:{},id:"beet",name:"Beet",sell:100,growth:6,start:56,end:83},{buy:30,harvest:{},id:"blue_jazz",name:"Blue Jazz",sell:50,growth:7,start:0,end:27},{buy:80,harvest:{extra_chance:.02,level_increase:5,max:5,min:3},id:"blueberry",name:"Blueberry",sell:50,growth:13,regrowth:4,start:28,end:55},{buy:50,harvest:{},id:"bok_choy",name:"Bok Choy",sell:80,growth:4,start:56,end:83},{buy:80,harvest:{},id:"cauliflower",name:"Cauliflower",sell:175,growth:12,start:0,end:27},{buy:30,harvest:{extra_chance:.02,level_increase:10,max:6,min:4},id:"coffee_bean",name:"Coffee Bean",sell:15,growth:10,regrowth:2,start:0,end:55},{buy:150,harvest:{extra_chance:0,level_increase:5,max:2,min:1},id:"corn",name:"Corn",sell:50,growth:14,regrowth:4,start:28,end:83},{buy:240,harvest:{extra_chance:.1,level_increase:5,max:6,min:2},id:"cranberries",name:"Cranberries",sell:75,growth:7,regrowth:5,start:56,end:83},{buy:20,harvest:{extra_chance:.002,level_increase:10,max:2,min:1},id:"eggplant",name:"Eggplant",sell:60,growth:5,regrowth:5,start:56,end:83},{buy:200,harvest:{},id:"fairy_rose",name:"Fairy Rose",sell:290,growth:12,start:56,end:83},{buy:40,harvest:{},id:"garlic",name:"Garlic",sell:60,growth:4,start:0,end:27},{buy:60,harvest:{extra_chance:0,level_increase:6,max:2,min:1},id:"grape",name:"Grape",sell:80,growth:10,regrowth:3,start:56,end:83},{buy:60,harvest:{extra_chance:0,level_increase:6,max:2,min:1},id:"green_bean",name:"Green Bean",sell:40,growth:10,regrowth:3,start:0,end:27},{buy:60,harvest:{extra_chance:0,level_increase:6,max:2,min:1},id:"hops",name:"Hops",sell:25,growth:11,regrowth:1,start:28,end:55},{buy:40,harvest:{extra_chance:.03,level_increase:5,max:1,min:1},id:"hot_pepper",name:"Hot Pepper",sell:40,growth:5,regrowth:3,start:28,end:55},{buy:70,harvest:{},id:"kale",name:"Kale",sell:110,growth:6,start:0,end:27},{buy:80,harvest:{},id:"melon",name:"Melon",sell:250,growth:12,start:28,end:55},{buy:20,harvest:{},id:"parsnip",name:"Parsnip",sell:35,growth:4,start:0,end:27},{buy:100,harvest:{},id:"poppy",name:"Poppy",sell:140,growth:7,start:28,end:55},{buy:50,harvest:{extra_chance:.2,level_increase:8,max:2,min:1},id:"potato",name:"Potato",sell:80,growth:6,start:0,end:27},{buy:100,harvest:{},id:"pumpkin",name:"Pumpkin",sell:320,growth:13,start:56,end:83},{buy:40,harvest:{},id:"radish",name:"Radish",sell:90,growth:6,start:28,end:55},{buy:100,harvest:{},id:"red_cabbage",name:"Red Cabbage",sell:260,growth:9,start:28,end:55},{buy:100,harvest:{},id:"rhubarb",name:"Rhubarb",sell:220,growth:13,start:0,end:27},{buy:400,harvest:{},id:"starfruit",name:"Starfruit",sell:750,growth:13,start:28,end:55},{buy:100,harvest:{extra_chance:.02,level_increase:5,max:1,min:1},id:"strawberry",name:"Strawberry",sell:120,growth:8,regrowth:4,start:0,end:27},{buy:50,harvest:{},id:"summer_spangle",name:"Summer Spangle",sell:90,growth:8,start:28,end:55},{buy:125,harvest:{},id:"sunflower",name:"Sunflower",sell:80,growth:8,start:28,end:83},{buy:1e3,harvest:{},id:"sweet_gem_berry",name:"Sweet Gem Berry",sell:3e3,growth:24,start:56,end:83},{buy:50,harvest:{extra_chance:.05,level_increase:6,max:1,min:1},id:"tomato",name:"Tomato",sell:60,growth:11,regrowth:4,start:28,end:55},{buy:20,harvest:{},id:"tulip",name:"Tulip",sell:30,growth:6,start:0,end:27},{buy:10,harvest:{},id:"wheat",name:"Wheat",sell:25,growth:4,start:28,end:83},{buy:60,harvest:{},id:"yam",name:"Yam",sell:160,growth:10,start:56,end:83}]},27:function(e,t,a){e.exports=a(57)},32:function(e,t,a){},4:function(e){e.exports=[{buy:0,id:"none",name:"None"},{buy:100,id:"basic_fertilizer",name:"Basic Fertilizer"},{buy:150,id:"quality_fertilizer",name:"Quality Fertilizer"},{buy:100,growth_rate:.1,id:"speed_gro",name:"Speed-Gro"},{buy:150,growth_rate:.25,id:"deluxe_speed_gro",name:"Deluxe Speed-Gro"}]},57:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(3),i=a.n(l),o=(a(32),a(6)),c=a(7),u=a(25),s=a(20),d=a(26),m=a(1),p=a(5),h=a(2),y=a(21),f=a.n(y),v=function(e){var t;return t=e.seed?"/images/seeds/".concat(e.crop.id,".png"):"/images/crops/".concat(e.crop.id,".png"),r.a.createElement("img",{src:t,alt:e.crop.name,width:20})},b=function(e){var t;return t="festival"===e.event.type?"/images/events/festival.gif":"/images/events/".concat(e.event.id,".png"),r.a.createElement("img",{src:t,alt:e.name,height:10})},g=r.a.memo(function(e){var t=e.event;return"plant"===t.type||"replant"===t.type||"harvest"===t.type?r.a.createElement(r.a.Fragment,null,r.a.createElement(v,{crop:t.crop,seed:"plant"===t.type}),r.a.createElement("span",null,"x",t.quantity)):r.a.createElement(r.a.Fragment,null,r.a.createElement(b,{event:t}),t.name)}),w=h.a.div.withConfig({displayName:"Day__StyledDay",componentId:"sc-1vo4tqh-0"})(["width:100%;height:100%;display:flex;flex-flow:column nowrap;background-color:",";"],function(e){return e.selected?"blue":"none"}),_=h.a.div.withConfig({displayName:"Day__StyledDayTitle",componentId:"sc-1vo4tqh-1"})(["height:35px;"]),E=h.a.div.withConfig({displayName:"Day__StyledEvents",componentId:"sc-1vo4tqh-2"})(["flex-grow:1;display:flex;flex-flow:column wrap;justify-content:start;overflow:auto;"]),x=h.a.div.withConfig({displayName:"Day__StyledEvent",componentId:"sc-1vo4tqh-3"})(["flex:1;"]);var O=r.a.memo(function(e){var t=e.day,a=e.selected,n=e.actions,l=e.setDay;return r.a.createElement(w,{selected:a,onClick:function(e){l(t)}},r.a.createElement(_,null,(t+1)%28),r.a.createElement(E,null,n.map(function(e){return r.a.createElement(x,{key:e.id},r.a.createElement(g,{event:e}))})))}),j=(a(56),{Title:h.a.div.withConfig({displayName:"Season__Title",componentId:"sc-7eudn8-0"})(["text-align:center;"]),Header:h.a.div.withConfig({displayName:"Season__Header",componentId:"sc-7eudn8-1"})(["flex:1;height:50px;"]),Block:h.a.div.withConfig({displayName:"Season__Block",componentId:"sc-7eudn8-2"})(["flex:1;height:100px;"]),Container:h.a.div.withConfig({displayName:"Season__Container",componentId:"sc-7eudn8-3"})(["display:flex;flex-flow:wrap row;"])}),C=j.Title,k=j.Header,S=j.Block,q=j.Container,z=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(function(e){return r.a.createElement(k,{key:e},e)});var D=r.a.memo(function(e){var t=e.season,a=e.day,l=e.plans,i=e.setDay,o=Object(n.useMemo)(function(){return f()(t.start,t.start+28).map(function(e){var t=l.flatMap(function(t){return t.getCropActionsOnDate(e)}).reduce(function(e,t){var a=e.get(t.id);return a?a.quantity+=t.quantity:e.set(t.id,t),e},new Map).values();return r.a.createElement(S,{key:e},r.a.createElement(O,{key:e,day:e,selected:e===a,actions:Object(p.a)(t),setDay:i}))})},[t,a,l]);return r.a.createElement(q,null,r.a.createElement(C,null,t.name),z,o)}),N=a(23);var P=a(10);var I=r.a.memo(function(e){var t=e.value,a=e.handleValue,n=e.isNullable,l=void 0===n||n,i=e.max,o=void 0===i?Number.MAX_SAFE_INTEGER:i,c=Object(P.a)(e,["value","handleValue","isNullable","max"]);return r.a.createElement("input",Object.assign({type:"text",value:Number.isInteger(t)?t:"",onChange:function(e){var t=Number.parseInt(e.target.value.replace(/\D/,""),10);Number.isNaN(t)?a(l?null:0):a(t<o?t:o)}},c))}),F=a(4);var A=r.a.memo(function(e){var t=e.value,a=e.handleValue,l=e.tag,i=Object(n.useCallback)(function(e){return a(F[e.target.value])},[]),o=F.map(function(e,a){return r.a.createElement(r.a.Fragment,{key:e.id},r.a.createElement("input",{type:"radio",id:e.id+"-"+l,name:"fertilizer-"+l,value:a,checked:e===t,onChange:i}),r.a.createElement("label",{htmlFor:e.id+"-"+l},e.name))});return r.a.createElement(r.a.Fragment,null,o)}),B=(F[0],a(11)),R=function(){function e(t){var a=this,n=t.crop,r=t.fertilizer,l=t.quantity,i=t.replant,c=void 0!==i&&i,u=t.start_date,s=t.end_date;Object(o.a)(this,e),this.shouldReplant=function(){return a.start_date+a.crop.growth!==a.end_date},this.isPlantDate=function(t){var n=e.getCropGrowth(a.crop,a.fertilizer);return a.start_date<=t&&t+n<=a.end_date&&(a.crop.regrowth?t===a.start_date:(t-a.start_date)%n===0)},this.isHarvestDate=function(t){var n=e.getCropGrowth(a.crop,a.fertilizer);return a.start_date<=t-n&&t<=a.end_date&&(a.crop.regrowth?t===a.start_date+n||(t-a.start_date-n)%a.crop.regrowth===0:(t-a.start_date-n)%n===0)},this.getAction=function(e){return{id:"".concat(e,"-").concat(a.crop.id),type:e,crop:a.crop,quantity:a.quantity}},this.getCropActionsOnDate=function(e){var t=a.isPlantDate(e),n=a.isHarvestDate(e);return t&&n?[a.getAction("plant"),a.getAction("harvest")]:t?[a.getAction("plant")]:n?[a.getAction("harvest")]:[]},this.split=function(t,n){var r=n.fertilizer,l=n.quantity,i=n.replant;return[new e(Object(B.a)({},a,{end_date:t})),new e({start_date:t,fertilizer:r||a.fertilizer,crop:a.crop,quantity:l||a.quantity,replant:void 0===i?a.shouldReplant():i})]},this.debug=function(){var e=Object(B.a)({},a);e.fertilizer=a.fertilizer.id,e.crop=a.crop.id,console.log(JSON.stringify(e,null,2))},Object.assign(this,{crop:n,fertilizer:r,quantity:l,start_date:u,end_date:c||n.regrowth?n.end:!1===c?u+e.getCropGrowth(n,r):s})}return Object(c.a)(e,[{key:"id",get:function(){return"".concat(this.crop.id,"-").concat(this.fertilizer.id,"-").concat(this.quantity,"-(").concat(this.start_date,"-").concat(this.end_date,")")}}],[{key:"getCropGrowth",value:function(e,t){return e.growth}},{key:"merge",value:function(t,a){if(e.compare(t,a))throw new Error("Plans must have equal dates, crop, and fertilizer to merge");var n=t.quantity,r=Object(P.a)(t,["quantity"]);return new e(Object(B.a)({quantity:n+a.quantity},r))}},{key:"compare",value:function(e,t){var a=e.start_date-t.start_date,n=e.crop.id.localeCompare(t.crop.id),r=e.fertilizer.id.localeCompare(t.fertilizer.id),l=e.end_date-t.end_date;return a>0?1:a<0?-1:n>0?1:n<0?-1:r>0?1:r<0?-1:l>0?1:l<0?-1:0}},{key:"equal",value:function(t,a){return 0===e.compare(t,a)&&t.quantity-a.quantity===0}}]),e}();var G=r.a.memo(function(e){var t=e.date,a=e.plan,l=e.handleSubmit,i=function(e,t){var a=Object(n.useCallback)(function(e,a){switch(a.type){case"price":return{price:a.price,quantity:Math.floor(a.price/t)};case"quantity":return{price:t*a.quantity,quantity:a.quantity};default:return e}},[t]),r=Object(n.useReducer)(a,{quantity:e,price:e*t}),l=Object(m.a)(r,2),i=l[0],o=l[1],c=Object(n.useCallback)(function(e){return o({type:"quantity",quantity:e})}),u=Object(n.useCallback)(function(e){return o({type:"price",price:e})});return[i.quantity,i.price,c,u]}(a.quantity,a.crop.buy),o=Object(m.a)(i,4),c=o[0],u=o[1],s=o[2],d=o[3],p=Object(n.useState)(a.fertilizer),h=Object(m.a)(p,2),y=h[0],f=h[1],v=Object(n.useState)(a.shouldReplant()),b=Object(m.a)(v,2),g=b[0],w=b[1],_=Object(n.useCallback)(function(e){e.preventDefault(),l(new R({crop:a.crop,quantity:c,fertilizer:y,replant:g,start_date:t}))}),E=Object(n.useCallback)(function(e){return w(!g)},[g]);return r.a.createElement("form",{onSubmit:_},r.a.createElement(I,{value:c,handleValue:s}),r.a.createElement(I,{value:u,handleValue:d}),r.a.createElement(A,{value:y,handleValue:f,tag:a.id}),!a.crop.regrowth&&r.a.createElement("input",{type:"checkbox",checked:g,onChange:E}),r.a.createElement("button",null,"Submit"))});var M=r.a.memo(function(e){var t=e.value,a=e.handleValue,n=e.crops,l=n.map(function(e,t){return r.a.createElement("option",{key:e.id,value:t},e.name)}),i=n.findIndex(function(e){return e===t});return r.a.createElement("select",{onChange:function(e){a(n[e.target.value])},value:i},r.a.createElement("option",{key:-1,value:-1},"Select a Crop"),l)}),T=F[0];var V=r.a.memo(function(e){var t=e.date,a=e.createPlan,l=Object(n.useMemo)(function(){return N.filter(function(e){return t>=e.start&&t+e.growth<=e.end})},[t]),i=Object(n.useState)(null),o=Object(m.a)(i,2),c=o[0],u=o[1],s={id:"create",crop:c,quantity:1,fertilizer:T,shouldReplant:function(){return!1}};return r.a.createElement(r.a.Fragment,null,r.a.createElement(M,{value:c,handleValue:u,crops:l}),c&&r.a.createElement(G,{key:c.id,date:t,plan:s,handleSubmit:a}))});var H=r.a.memo(function(e){var t=e.date,a=e.plan,l=e.updatePlan,i=e.deletePlan,o=Object(n.useCallback)(function(e){return l(a,e)},[a]),c=Object(n.useCallback)(function(){return i(a)},[a]);return r.a.createElement(r.a.Fragment,null,a.crop.name,r.a.createElement(G,{date:t,plan:a,handleSubmit:o}),r.a.createElement("button",{onClick:c},"Remove"))});var J=r.a.memo(function(e){var t=e.date,a=e.plans,l=e.createPlan,i=e.updatePlan,o=e.deletePlan,c=Object(n.useMemo)(function(){return a.filter(function(e){return e.isPlantDate(t)}).map(function(e){return r.a.createElement(H,{key:e.id,date:t,plan:e,updatePlan:i,deletePlan:o})})},[t,a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(V,{date:t,createPlan:l}),c)}),W=h.a.div.withConfig({displayName:"Drawer__StyledDrawer",componentId:"dap0tm-0"})(["position:fixed;bottom:0;left:0;width:100vw;display:flex;flex-flow:column nowrap;"]),K=h.a.div.withConfig({displayName:"Drawer__StyledHandle",componentId:"dap0tm-1"})(["align-self:center;background-color:WhiteSmoke;"]),Q=h.a.div.withConfig({displayName:"Drawer__StyledContent",componentId:"dap0tm-2"})(["display:",";flex:1;padding:5vh;background-color:WhiteSmoke;"],function(e){return e.visible?"flex":"none"}),X=document.createElement("div");var Y=r.a.memo(function(e){var t=e.visible,a=e.onOpen,l=e.onClose,o=e.children;Object(n.useEffect)(function(){document.body.appendChild(X)},[]);var c=Object(n.useCallback)(function(){t?l():a()});return i.a.createPortal(r.a.createElement(W,null,r.a.createElement(K,{onClick:c}," handle"),r.a.createElement(Q,{visible:t},o)),X)});function L(e,t){var a=t.findIndex(function(t){return 0===R.compare(t,e)});if(a>=0){var n=t[a],r=t.filter(function(t){return 0!==R.compare(t,e)}),l=[R.merge(n,e)].concat(Object(p.a)(r));return l.sort(R.compare),l}var i=[e].concat(Object(p.a)(t));return i.sort(R.compare),i}function U(e,t){return t.filter(function(t){return!R.equal(t,e)})}var Z=function(e,t){switch(t.type){case"create":return L(t.plan,e);case"update":return L(t.new_plan,U(t.old_plan,e));case"delete":return U(t.plan,e);default:return e}};var $=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=Object(n.useReducer)(Z,e),a=Object(m.a)(t,2),r=a[0],l=a[1];return[r,function(e){return l({type:"create",plan:e})},function(e,t){return l({type:"update",old_plan:e,new_plan:t})},function(e){return l({type:"delete",plan:e})}]},ee=[{name:"spring",start:0},{name:"summer",start:28},{name:"fall",start:56},{name:"winter",start:84}];function te(){var e=Object(n.useState)(0),t=Object(m.a)(e,2),a=t[0],l=t[1],i=Object(n.useState)(0),o=Object(m.a)(i,2),c=o[0],u=o[1],s=$([]),d=Object(m.a)(s,4),p=d[0],h=d[1],y=d[2],f=d[3],v=Object(n.useState)(!0),b=Object(m.a)(v,2),g=b[0],w=b[1],_=Object(n.useCallback)(function(){return w(!0)},[]),E=Object(n.useCallback)(function(){return w(!1)},[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(I,{value:a,handleValue:l,isNullable:!1,max:3}),r.a.createElement(D,{season:ee[a],day:c,plans:p,setDay:u}),r.a.createElement(Y,{visible:g,onOpen:_,onClose:E},r.a.createElement(J,{key:c,date:c,plans:p,createPlan:h,updatePlan:y,deletePlan:f})))}var ae=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(te,null)}}]),t}(r.a.Component);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ae,null)),document.getElementById("root"))}},[[27,2,1]]]);
//# sourceMappingURL=main.526bac74.chunk.js.map