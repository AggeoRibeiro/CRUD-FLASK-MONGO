(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{42:function(t,e,n){"use strict";n.r(e);var c=n(2),r=n.n(c),a=n(17),s=n.n(a),o=n(3),u=n(7),i=n(4),j=n(8),p=n.n(j),b=n(0);var l=function(){var t=Object(c.useState)([]),e=Object(i.a)(t,2),n=e[0],r=e[1],a=Object(c.useState)(""),s=Object(i.a)(a,2),j=s[0],l=s[1],O=Object(c.useState)(""),h=Object(i.a)(O,2),d=h[0],f=h[1];Object(c.useEffect)((function(){v()}),[]);var v=function(){var t=Object(u.a)(Object(o.a)().mark((function t(){var e;return Object(o.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p.a.get("/noticias");case 3:e=t.sent,r(e.data),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),x=function(){var t=Object(u.a)(Object(o.a)().mark((function t(e){return Object(o.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,p.a.post("/noticias",{title:j,content:d});case 4:l(""),f(""),v(),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}();return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Not\xedcias"}),Object(b.jsxs)("form",{onSubmit:x,children:[Object(b.jsx)("input",{type:"text",placeholder:"T\xedtulo",value:j,onChange:function(t){return l(t.target.value)}}),Object(b.jsx)("textarea",{placeholder:"Conte\xfado",value:d,onChange:function(t){return f(t.target.value)}}),Object(b.jsx)("button",{type:"submit",children:"Adicionar Not\xedcia"})]}),n.map((function(t){return Object(b.jsxs)("div",{children:[Object(b.jsx)("h3",{children:t.title}),Object(b.jsx)("p",{children:t.content})]},t.id)}))]})};s.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(l,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.9256ae38.chunk.js.map