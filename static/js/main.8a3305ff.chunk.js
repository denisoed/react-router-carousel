(this["webpackJsonpreact-router-carousel-example"]=this["webpackJsonpreact-router-carousel-example"]||[]).push([[0],{26:function(e,t,n){e.exports=n(54)},27:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);n(27);var a=n(0),r=n.n(a),i=n(20),o=n.n(i),l=n(1),u=n(14),c=n(11),s=n.n(c);function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var m=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)},d=R,f=b,h=function(e,t){return w(b(e,t),t)},v=w,g=q,E=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function b(e,t){for(var n,a=[],r=0,i=0,o="",l=t&&t.delimiter||"/";null!=(n=E.exec(e));){var u=n[0],c=n[1],s=n.index;if(o+=e.slice(i,s),i=s+u.length,c)o+=c[1];else{var p=e[i],m=n[2],d=n[3],f=n[4],h=n[5],v=n[6],g=n[7];o&&(a.push(o),o="");var b=null!=m&&null!=p&&p!==m,x="+"===v||"*"===v,w="?"===v||"*"===v,O=n[2]||l,C=f||h;a.push({name:d||r++,prefix:m||"",delimiter:O,optional:w,repeat:x,partial:b,asterisk:!!g,pattern:C?j(C):g?".*":"[^"+y(O)+"]+?"})}}return i<e.length&&(o+=e.substr(i)),o&&a.push(o),a}function x(e){return encodeURI(e).replace(/[\/?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()}))}function w(e,t){for(var n=new Array(e.length),a=0;a<e.length;a++)"object"===typeof e[a]&&(n[a]=new RegExp("^(?:"+e[a].pattern+")$",C(t)));return function(t,a){for(var r="",i=t||{},o=(a||{}).pretty?x:encodeURIComponent,l=0;l<e.length;l++){var u=e[l];if("string"!==typeof u){var c,s=i[u.name];if(null==s){if(u.optional){u.partial&&(r+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(m(s)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(s)+"`");if(0===s.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var p=0;p<s.length;p++){if(c=o(s[p]),!n[l].test(c))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(c)+"`");r+=(0===p?u.prefix:u.delimiter)+c}}else{if(c=u.asterisk?encodeURI(s).replace(/[?#]/g,(function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})):o(s),!n[l].test(c))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+c+'"');r+=u.prefix+c}}else r+=u}return r}}function y(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function j(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function O(e,t){return e.keys=t,e}function C(e){return e&&e.sensitive?"":"i"}function q(e,t,n){m(t)||(n=t||n,t=[]);for(var a=(n=n||{}).strict,r=!1!==n.end,i="",o=0;o<e.length;o++){var l=e[o];if("string"===typeof l)i+=y(l);else{var u=y(l.prefix),c="(?:"+l.pattern+")";t.push(l),l.repeat&&(c+="(?:"+u+c+")*"),i+=c=l.optional?l.partial?u+"("+c+")?":"(?:"+u+"("+c+"))?":u+"("+c+")"}}var s=y(n.delimiter||"/"),p=i.slice(-s.length)===s;return a||(i=(p?i.slice(0,-s.length):i)+"(?:"+s+"(?=$))?"),i+=r?"$":a&&p?"":"(?="+s+"|$)",O(new RegExp("^"+i,C(n)),t)}function R(e,t,n){return m(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var a=0;a<n.length;a++)t.push({name:a,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return O(e,t)}(e,t):m(e)?function(e,t,n){for(var a=[],r=0;r<e.length;r++)a.push(R(e[r],t,n).source);return O(new RegExp("(?:"+a.join("|")+")",C(n)),t)}(e,t,n):function(e,t,n){return q(b(e,n),t,n)}(e,t,n)}d.parse=f,d.compile=h,d.tokensToFunction=v,d.tokensToRegExp=g;var S={},k=0,N=function(e,t){return void 0===e&&(e="/"),void 0===t&&(t={}),"/"===e?e:function(e){var t=e,n=S[t]||(S[t]={});if(n[e])return n[e];var a=d.compile(e);return k<1e4&&(n[e]=a,k++),a}(e)(t)},A=Object(l.g)((function(e){var t=Object(a.useState)([]),n=t[0],i=t[1],o=Object(a.useState)(0),c=o[0],m=o[1],d=Object(a.useState)(!1),f=d[0],h=d[1],v=Object(a.useState)(!1),g=v[0],E=v[1],b=Object(a.useState)(!1),x=b[0],w=b[1],y=Object(a.useState)(!1),j=y[0],O=y[1],C=e.children,q=e.index,R=e.location,S=e.history,k=e.replace,A=e.sliderMode,z=e.swipeLeftClassName,L=e.swipeRightClassName,U=e.fallbackRoute,P=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null)),T=[];if(null!==C&&void 0!==C&&C.length?C.forEach((function(){T.push(P)})):T.push(P),!A){var I=r.a.Children.toArray(C).find((function(e){var t;return(null===e||void 0===e||null===(t=e.props)||void 0===t?void 0:t.path)===R.pathname}));T[c]=I||P}var $=function(e){var t,a,o=r.a.Children.toArray(C)[e].props,l=o.path,u=o.defaultParams;l.includes(":")?l in n?t=n[l]:(t=N(l,u),i({urls:p({},n,(a={},a[l]=t,a))})):t=l;J(t)},M=function(e){A||$(e),m(e)},J=function(e){return k?S.replace(e):S.push(e)},F=Object(u.useSwipeable)({onSwipedRight:function(){return function(e){if(e){var t=c>0?c-1:0;return m(t),A||$(t),!0}return!1}(g)},preventDefaultTouchmoveEvent:!0,trackMouse:!0}),H=Object(u.useSwipeable)({onSwipedLeft:function(){return function(e){if(e){var t=A?C.length-1:T.length-1,n=c<t?c+1:t;return m(n),A||$(n),!0}return!1}(x)},preventDefaultTouchmoveEvent:!0,trackMouse:!0}),D=function(){r.a.Children.forEach(C,(function(e,t){var n=e.props,a=n.path,r=n.exact,i=n.strict,o=n.from,u=a||o;Object(l.f)(R.pathname,{path:u,exact:r,strict:i})&&m(t)}))},B=r.a.createElement("section",p({},F,{className:z})),G=r.a.createElement("section",p({},H,{className:L}));return Object(a.useEffect)((function(){A||(r.a.Children.forEach(C,(function(e,t){var a,r=e.props,o=r.path,u=r.exact,c=r.strict,s=r.from,m=o||s;Object(l.f)(S.location.pathname,{path:m,exact:u,strict:c})&&i(p({},n,((a={})[m]=S.location.pathname,a)))})),D())}),[]),Object(a.useEffect)((function(){A||(D(),h(T.some((function(e){var t,n,a;if(null!==e&&void 0!==e&&null!==(t=e.props)&&void 0!==t&&null!==(n=t.path)&&void 0!==n&&n.includes(":")){var r=Object.keys(e.props.defaultParams)[0];return e.props.path.replace(":"+r,e.props.defaultParams[r])===R.pathname}return(null===e||void 0===e||null===(a=e.props)||void 0===a?void 0:a.path)===R.pathname}))))}),[R.pathname]),Object(a.useEffect)((function(){if(q&&A){var e=A?C:T,t=q>=(null===e||void 0===e?void 0:e.length)||q;m(t>=1?t-1:1)}}),[q]),Object(a.useEffect)((function(){!function(){var e,t,n,a,r,i,o,l,u=A?C:T;null!==(e=u[c])&&void 0!==e&&null!==(t=e.props)&&void 0!==t&&t.swipeleft?E(!0):E(!1),null!==(n=u[c])&&void 0!==n&&null!==(a=n.props)&&void 0!==a&&a.swiperight?w(!0):w(!1),null!==(r=u[c])&&void 0!==r&&null!==(i=r.props)&&void 0!==i&&i.swiperight||null!==(o=u[c])&&void 0!==o&&null!==(l=o.props)&&void 0!==l&&l.swipeleft?O(!0):O(!1)}()})),r.a.createElement(r.a.Fragment,null,A&&g&&B,g&&f&&B,!A&&f&&r.a.createElement(s.a,{index:c,onChangeIndex:M,disabled:j},T.map((function(e){if(null!==e&&void 0!==e&&e.props){var t,n=e.props,a=n.path,i=n.component,o=n.render,u=n.children,c={location:R,history:S},s=Object(l.f)(R.pathname,null===e||void 0===e?void 0:e.props);return s=Object(l.f)(N(a,null===e||void 0===e||null===(t=e.props)||void 0===t?void 0:t.defaultParams),null===e||void 0===e?void 0:e.props),c.match=s,c.key=a,i?r.a.createElement(i,c):o?o(c):u}}))),!f&&U||null,A&&r.a.createElement(s.a,{index:c,onChangeIndex:M,disabled:j},C),x&&f&&G,A&&x&&G)})),z=n(6),L=n(22),U=n(23),P=n(25),T=n(24);var I=function(){return r.a.createElement("div",{style:{width:"100%",height:440}},r.a.createElement("h1",null,"Home page"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))},$=function(){return r.a.createElement("div",{style:{width:"100%",height:440}},r.a.createElement("h1",null,"About page"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),r.a.createElement(z.b,{to:"/map",activeClassName:"activeRoute"},"Map"))},M=function(){return r.a.createElement("div",{style:{width:"100%",height:440,position:"relative"}},r.a.createElement("h1",null,"Contact page"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."),r.a.createElement("section",{style:{width:"70%",height:70,position:"relative",margin:"0 auto"}},r.a.createElement(A,{sliderMode:!0,index:"1",swipeLeftClassName:"router-carousel-zone router-carousel-zone--left",swipeRightClassName:"router-carousel-zone router-carousel-zone--right"},r.a.createElement("h2",{swipeleft:"false",swiperight:"true"},"EMail"),r.a.createElement("h2",null,"Phone number"),r.a.createElement("h2",null,"Address"))))},J=function(){return r.a.createElement("div",{style:{width:"100%",height:440}},r.a.createElement("h1",null,"Profile page"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))},F=function(){return r.a.createElement("div",{style:{width:"100%",height:440}},r.a.createElement("h1",null,"Map page"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))},H=function(){return r.a.createElement("div",{style:{width:"100%",height:440}},r.a.createElement("h1",null,"Login page"),r.a.createElement("h3",null,"React Hoc is works!"),r.a.createElement("p",null,"If the user is not authorized, it will be transferred to the authorization page"))},D=function(){return r.a.createElement("div",{style:{width:"100%",height:440}},r.a.createElement("h1",null,"404 page"),r.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."))},B=function(){return r.a.createElement(A,{swipeLeftClassName:"router-carousel-zone router-carousel-zone--left",swipeRightClassName:"router-carousel-zone router-carousel-zone--right",fallbackRoute:r.a.createElement(D,null)},r.a.createElement(l.b,{exact:!0,path:"/",component:I}),r.a.createElement(l.b,{path:"/about",component:$}),r.a.createElement(l.b,{path:"/contact",component:M,swipeleft:!0,swiperight:!0}),r.a.createElement(l.b,{path:"/profile",component:(e=J,function(t){Object(P.a)(a,t);var n=Object(T.a)(a);function a(){return Object(L.a)(this,a),n.apply(this,arguments)}return Object(U.a)(a,[{key:"render",value:function(){return localStorage.getItem("accessToken")?r.a.createElement(e,null):r.a.createElement(l.a,{to:{pathname:"/login"}})}}]),a}(a.PureComponent))}));var e},G=function(){return r.a.createElement(z.a,null,r.a.createElement("h1",null,"React Router Carousel"),r.a.createElement("div",{style:{textAlign:"center",width:"98%",height:440,borderRadius:10,border:"1px solid #222",padding:20,boxSizing:"border-box",margin:"0 auto",position:"relative",overflow:"hidden"}},r.a.createElement(l.d,null,r.a.createElement(l.b,{path:"/map",component:F}),r.a.createElement(l.b,{path:"/login",component:H}),r.a.createElement(l.b,{path:"*",component:B})),r.a.createElement("div",{className:"menu"},r.a.createElement(z.b,{exact:!0,to:"/",activeClassName:"activeRoute"},"Home"),r.a.createElement(z.b,{to:"/about",activeClassName:"activeRoute"},"About"),r.a.createElement(z.b,{to:"/contact",activeClassName:"activeRoute"},"Contact"),r.a.createElement(z.b,{to:"/profile",activeClassName:"activeRoute"},"Profile"))),r.a.createElement("p",{style:{width:"100%",padding:10,boxSizing:"border-box",textAlign:"center",margin:0}},"Please open the example on a mobile device or emulator in your browser(f12)"))};o.a.render(r.a.createElement(G,null),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.8a3305ff.chunk.js.map