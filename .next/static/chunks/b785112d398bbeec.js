(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37727,e=>{"use strict";let t=(0,e.i(75254).default)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);e.s(["X",()=>t],37727)},15186,e=>{"use strict";let t=(0,e.i(75254).default)("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);e.s(["Home",()=>t],15186)},5766,e=>{"use strict";let t,r;var n,i=e.i(71645);let a={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,u=(e,t)=>{let r="",n="",i="";for(let a in e){let o=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+o+";":n+="f"==a[1]?u(o,a):a+"{"+u(o,"k"==a[1]?"":t)+"}":"object"==typeof o?n+=u(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=o&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=u.p?u.p(a,o):a+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+n},c={},d=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+d(e[r]);return t}return e};function p(e){let t,r,n=this||{},i=e.call?e(n.p):e;return((e,t,r,n,i)=>{var a;let p=d(e),f=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[f]){let t=p!==e?e:(e=>{let t,r,n=[{}];for(;t=o.exec(e.replace(s,""));)t[4]?n.shift():t[3]?(r=t[3].replace(l," ").trim(),n.unshift(n[0][r]=n[0][r]||{})):n[0][t[1]]=t[2].replace(l," ").trim();return n[0]})(e);c[f]=u(i?{["@keyframes "+f]:t}:t,r?"":"."+f)}let h=r&&c.g?c.g:null;return r&&(c.g=c[f]),a=c[f],h?t.data=t.data.replace(h,a):-1===t.data.indexOf(a)&&(t.data=n?a+t.data:t.data+a),f})(i.unshift?i.raw?(t=[].slice.call(arguments,1),r=n.p,i.reduce((e,n,i)=>{let a=t[i];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+n+(null==a?"":a)},"")):i.reduce((e,t)=>Object.assign(e,t&&t.call?t(n.p):t),{}):i,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||a})(n.target),n.g,n.o,n.k)}p.bind({g:1});let f,h,m,y=p.bind({k:1});function g(e,t){let r=this||{};return function(){let n=arguments;function i(a,o){let s=Object.assign({},a),l=s.className||i.className;r.p=Object.assign({theme:h&&h()},s),r.o=/ *go\d+/.test(l),s.className=p.apply(r,n)+(l?" "+l:""),t&&(s.ref=o);let u=e;return e[0]&&(u=s.as||e,delete s.as),m&&u[0]&&m(s),f(u,s)}return t?t(i):i}}var x=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:n}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===n.id),toast:n});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||void 0===i?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},E=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},P=(e,t=w)=>{C[t]=j(C[t]||k,e),E.forEach(([e,r])=>{e===t&&r(C[t])})},N=e=>Object.keys(C).forEach(t=>P(e,t)),S=(e=w)=>t=>{P(t,e)},O={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=(e={},t=w)=>{let[r,n]=(0,i.useState)(C[t]||k),a=(0,i.useRef)(C[t]);(0,i.useEffect)(()=>(a.current!==C[t]&&n(C[t]),E.push([t,n]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,n,i;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(n=e[t.type])?void 0:n.duration)||(null==e?void 0:e.duration)||O[t.type],style:{...e.style,...null==(i=e[t.type])?void 0:i.style,...t.style}}});return{...r,toasts:o}},A=e=>(t,r)=>{let n,i=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||b()}))(t,e,r);return S(i.toasterId||(n=i.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===n))))({type:2,toast:i}),i.id},$=(e,t)=>A("blank")(e,t);$.error=A("error"),$.success=A("success"),$.loading=A("loading"),$.custom=A("custom"),$.dismiss=(e,t)=>{let r={type:3,toastId:e};t?S(t)(r):N(r)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let r={type:4,toastId:e};t?S(t)(r):N(r)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,r)=>{let n=$.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?x(t.success,e):void 0;return i?$.success(i,{id:n,...r,...null==r?void 0:r.success}):$.dismiss(n),e}).catch(e=>{let i=t.error?x(t.error,e):void 0;i?$.error(i,{id:n,...r,...null==r?void 0:r.error}):$.dismiss(n)}),e};var M=1e3,L=(e,t="default")=>{let{toasts:r,pausedAt:n}=T(e,t),a=(0,i.useRef)(new Map).current,o=(0,i.useCallback)((e,t=M)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),s({type:4,toastId:e})},t);a.set(e,r)},[]);(0,i.useEffect)(()=>{if(n)return;let e=Date.now(),i=r.map(r=>{if(r.duration===1/0)return;let n=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(n<0){r.visible&&$.dismiss(r.id);return}return setTimeout(()=>$.dismiss(r.id,t),n)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[r,n,t]);let s=(0,i.useCallback)(S(t),[t]),l=(0,i.useCallback)(()=>{s({type:5,time:Date.now()})},[s]),u=(0,i.useCallback)((e,t)=>{s({type:1,toast:{id:e,height:t}})},[s]),c=(0,i.useCallback)(()=>{n&&s({type:6,time:Date.now()})},[n,s]),d=(0,i.useCallback)((e,t)=>{let{reverseOrder:n=!1,gutter:i=8,defaultPosition:a}=t||{},o=r.filter(t=>(t.position||a)===(e.position||a)&&t.height),s=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<s&&e.visible).length;return o.filter(e=>e.visible).slice(...n?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[r]);return(0,i.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:u,startPause:l,endPause:c,calculateOffset:d}}},_=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,I=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${I} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,D=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${D} 1s linear infinite;
`,H=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,B=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,K=g("div")`
  position: absolute;
`,G=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,V=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${V} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,q=({toast:e})=>{let{icon:t,type:r,iconTheme:n}=e;return void 0!==t?"string"==typeof t?i.createElement(W,null,t):t:"blank"===r?null:i.createElement(G,null,i.createElement(U,{...n}),"loading"!==r&&i.createElement(K,null,"error"===r?i.createElement(z,{...n}):i.createElement(B,{...n})))},X=g("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Z=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Q=i.memo(({toast:e,position:t,style:r,children:n})=>{let a=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[n,i]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${y(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=i.createElement(q,{toast:e}),s=i.createElement(Z,{...e.ariaProps},x(e.message,e));return i.createElement(X,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof n?n({icon:o,message:s}):i.createElement(i.Fragment,null,o,s))});n=i.createElement,u.p=void 0,f=n,h=void 0,m=void 0;var J=({id:e,className:t,style:r,onHeightUpdate:n,children:a})=>{let o=i.useCallback(t=>{if(t){let r=()=>{n(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return i.createElement("div",{ref:o,className:t,style:r},a)},Y=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:a,toasterId:o,containerStyle:s,containerClassName:l})=>{let{toasts:u,handlers:c}=L(r,o);return i.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(r=>{let o,s,l=r.position||t,u=c.calculateOffset(r,{reverseOrder:e,gutter:n,defaultPosition:t}),d=(o=l.includes("top"),s=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${u*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...s});return i.createElement(J,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Y:"",style:d},"custom"===r.type?x(r.message,r):a?a(r):i.createElement(Q,{toast:r,position:l}))}))};e.s(["CheckmarkIcon",()=>B,"ErrorIcon",()=>z,"LoaderIcon",()=>U,"ToastBar",()=>Q,"ToastIcon",()=>q,"Toaster",()=>ee,"default",()=>$,"resolveValue",()=>x,"toast",()=>$,"useToaster",()=>L,"useToasterStore",()=>T],5766)},33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},18566,(e,t,r)=>{t.exports=e.r(76562)},12717,e=>{"use strict";var t=e.i(43476),r=e.i(71645);e.i(51718);var n=e.i(41264);e.i(36180);var i=e.i(17875),a=e.i(91557);let o=(0,r.createContext)(null);function s({children:e}){let[s,l]=(0,r.useState)(null),[u,c]=(0,r.useState)(null),[d,p]=(0,r.useState)(!0);(0,r.useEffect)(()=>(0,n.onAuthStateChanged)(a.auth,async e=>{if(e){l(e);let t=await (0,i.getDoc)((0,i.doc)(a.db,"users",e.uid));t.exists()&&c(t.data())}else l(null),c(null);p(!1)}),[]);let f={user:s,userProfile:u,loading:d,register:async function({email:e,password:t,name:r,role:o,commissionRate:s=0,commissionAgreed:l=!0}){let{user:u}=await (0,n.createUserWithEmailAndPassword)(a.auth,e,t);return await (0,n.updateProfile)(u,{displayName:r}),await (0,i.setDoc)((0,i.doc)(a.db,"users",u.uid),{uid:u.uid,name:r,email:e,role:o,commissionRate:s,commissionAgreed:l,createdAt:(0,i.serverTimestamp)(),verified:!1}),u},login:async function(e,t){return(0,n.signInWithEmailAndPassword)(a.auth,e,t)},loginWithGoogle:async function(e="student"){let t=new n.GoogleAuthProvider,{user:r}=await (0,n.signInWithPopup)(a.auth,t),o=(0,i.doc)(a.db,"users",r.uid);return(await (0,i.getDoc)(o)).exists()||await (0,i.setDoc)(o,{uid:r.uid,name:r.displayName,email:r.email,role:e,createdAt:(0,i.serverTimestamp)(),verified:!1}),r},logout:async function(){await (0,n.signOut)(a.auth)},isStudent:u?.role==="student",isLandlord:u?.role==="landlord",isAdmin:u?.role==="admin"};return(0,t.jsx)(o.Provider,{value:f,children:!d&&e})}function l(){let e=(0,r.useContext)(o);if(!e)throw Error("useAuth must be used within AuthProvider");return e}e.s(["AuthProvider",()=>s,"useAuth",()=>l])},88653,e=>{"use strict";e.i(47167);var t=e.i(43476),r=e.i(71645),n=e.i(31178),i=e.i(47414),a=e.i(21476),o=r,s=e.i(37806);class l extends o.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function u({children:e,isPresent:r}){let n=(0,o.useId)(),i=(0,o.useRef)(null),a=(0,o.useRef)({width:0,height:0,top:0,left:0}),{nonce:u}=(0,o.useContext)(s.MotionConfigContext);return(0,o.useInsertionEffect)(()=>{let{width:e,height:t,top:o,left:s}=a.current;if(r||!i.current||!e||!t)return;i.current.dataset.motionPopId=n;let l=document.createElement("style");return u&&(l.nonce=u),document.head.appendChild(l),l.sheet&&l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${t}px !important;
            top: ${o}px !important;
            left: ${s}px !important;
          }
        `),()=>{document.head.removeChild(l)}},[r]),(0,t.jsx)(l,{isPresent:r,childRef:i,sizeRef:a,children:o.cloneElement(e,{ref:i})})}let c=({children:e,initial:n,isPresent:o,onExitComplete:s,custom:l,presenceAffectsLayout:c,mode:p})=>{let f=(0,i.useConstant)(d),h=(0,r.useId)(),m=(0,r.useCallback)(e=>{for(let t of(f.set(e,!0),f.values()))if(!t)return;s&&s()},[f,s]),y=(0,r.useMemo)(()=>({id:h,initial:n,isPresent:o,custom:l,onExitComplete:m,register:e=>(f.set(e,!1),()=>f.delete(e))}),c?[Math.random(),m]:[o,m]);return(0,r.useMemo)(()=>{f.forEach((e,t)=>f.set(t,!1))},[o]),r.useEffect(()=>{o||f.size||!s||s()},[o]),"popLayout"===p&&(e=(0,t.jsx)(u,{isPresent:o,children:e})),(0,t.jsx)(a.PresenceContext.Provider,{value:y,children:e})};function d(){return new Map}var p=e.i(64978);let f=e=>e.key||"";function h(e){let t=[];return r.Children.forEach(e,e=>{(0,r.isValidElement)(e)&&t.push(e)}),t}var m=e.i(74008);let y=({children:e,custom:a,initial:o=!0,onExitComplete:s,presenceAffectsLayout:l=!0,mode:u="sync",propagate:d=!1})=>{let[y,g]=(0,p.usePresence)(d),x=(0,r.useMemo)(()=>h(e),[e]),b=d&&!y?[]:x.map(f),v=(0,r.useRef)(!0),w=(0,r.useRef)(x),j=(0,i.useConstant)(()=>new Map),[E,k]=(0,r.useState)(x),[C,P]=(0,r.useState)(x);(0,m.useIsomorphicLayoutEffect)(()=>{v.current=!1,w.current=x;for(let e=0;e<C.length;e++){let t=f(C[e]);b.includes(t)?j.delete(t):!0!==j.get(t)&&j.set(t,!1)}},[C,b.length,b.join("-")]);let N=[];if(x!==E){let e=[...x];for(let t=0;t<C.length;t++){let r=C[t],n=f(r);b.includes(n)||(e.splice(t,0,r),N.push(r))}"wait"===u&&N.length&&(e=N),P(h(e)),k(x);return}let{forceRender:S}=(0,r.useContext)(n.LayoutGroupContext);return(0,t.jsx)(t.Fragment,{children:C.map(e=>{let r=f(e),n=(!d||!!y)&&(x===C||b.includes(r));return(0,t.jsx)(c,{isPresent:n,initial:(!v.current||!!o)&&void 0,custom:n?void 0:a,presenceAffectsLayout:l,mode:u,onExitComplete:n?void 0:()=>{if(!j.has(r))return;j.set(r,!0);let e=!0;j.forEach(t=>{t||(e=!1)}),e&&(null==S||S(),P(w.current),d&&(null==g||g()),s&&s())},children:e},r)})})};e.s(["AnimatePresence",()=>y],88653)},32095,e=>{"use strict";let t=(0,e.i(75254).default)("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);e.s(["GraduationCap",()=>t],32095)},7486,e=>{"use strict";let t=(0,e.i(75254).default)("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);e.s(["Building2",()=>t],7486)},55436,e=>{"use strict";let t=(0,e.i(75254).default)("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);e.s(["Search",()=>t],55436)},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});function a(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function o(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,o(e));else t.set(r,o(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return s},formatWithValidation:function(){return u},urlObjectKeys:function(){return l}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(90809)._(e.r(98183)),o=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,n=e.protocol||"",i=e.pathname||"",s=e.hash||"",l=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),l&&"object"==typeof l&&(l=String(a.urlQueryToSearchParams(l)));let c=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||o.test(n))&&!1!==u?(u="//"+(u||""),i&&"/"!==i[0]&&(i="/"+i)):u||(u=""),s&&"#"!==s[0]&&(s="#"+s),c&&"?"!==c[0]&&(c="?"+c),i=i.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${n}${u}${i}${c}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return s(e)}},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return g},MiddlewareNotFoundError:function(){return w},MissingStaticPage:function(){return v},NormalizeError:function(){return x},PageNotFoundError:function(){return b},SP:function(){return m},ST:function(){return y},WEB_VITALS:function(){return a},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return j}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>s.test(e);function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let m="u">typeof performance,y=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class x extends Error{}class b extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class w extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(18967),i=e.r(52817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,i.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return g},useLinkStatus:function(){return b}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(90809),o=e.r(43476),s=a._(e.r(71645)),l=e.r(95057),u=e.r(8372),c=e.r(18581),d=e.r(18967),p=e.r(5550);e.r(33525);let f=e.r(91949),h=e.r(73668),m=e.r(9396);function y(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function g(t){var r;let n,i,a,[l,g]=(0,s.useOptimistic)(f.IDLE_LINK_STATUS),b=(0,s.useRef)(null),{href:v,as:w,children:j,prefetch:E=null,passHref:k,replace:C,shallow:P,scroll:N,onClick:S,onMouseEnter:O,onTouchStart:T,legacyBehavior:A=!1,onNavigate:$,ref:M,unstable_dynamicOnHover:L,..._}=t;n=j,A&&("string"==typeof n||"number"==typeof n)&&(n=(0,o.jsx)("a",{children:n}));let I=s.default.useContext(u.AppRouterContext),R=!1!==E,z=!1!==E?null===(r=E)||"auto"===r?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,{href:D,as:U}=s.default.useMemo(()=>{let e=y(v);return{href:e,as:w?y(w):e}},[v,w]);if(A){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});i=s.default.Children.only(n)}let H=A?i&&"object"==typeof i&&i.ref:M,F=s.default.useCallback(e=>(null!==I&&(b.current=(0,f.mountLinkInstance)(e,D,I,z,R,g)),()=>{b.current&&((0,f.unmountLinkForCurrentNavigation)(b.current),b.current=null),(0,f.unmountPrefetchableInstance)(e)}),[R,D,I,z,g]),B={ref:(0,c.useMergedRef)(F,H),onClick(t){A||"function"!=typeof S||S(t),A&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(t),!I||t.defaultPrevented||function(t,r,n,i,a,o,l){if("u">typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);s.default.startTransition(()=>{d(n||r,a?"replace":"push",o??!0,i.current)})}}(t,D,U,b,C,N,$)},onMouseEnter(e){A||"function"!=typeof O||O(e),A&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),I&&R&&(0,f.onNavigationIntent)(e.currentTarget,!0===L)},onTouchStart:function(e){A||"function"!=typeof T||T(e),A&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),I&&R&&(0,f.onNavigationIntent)(e.currentTarget,!0===L)}};return(0,d.isAbsoluteUrl)(U)?B.href=U:A&&!k&&("a"!==i.type||"href"in i.props)||(B.href=(0,p.addBasePath)(U)),a=A?s.default.cloneElement(i,B):(0,o.jsx)("a",{..._,...B,children:n}),(0,o.jsx)(x.Provider,{value:l,children:a})}e.r(84508);let x=(0,s.createContext)(f.IDLE_LINK_STATUS),b=()=>(0,s.useContext)(x);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},98919,e=>{"use strict";let t=(0,e.i(75254).default)("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);e.s(["Shield",()=>t],98919)},26122,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(22016),i=e.i(18566),a=e.i(46932),o=e.i(88653),s=e.i(15186),l=e.i(55436),u=e.i(75254);let c=(0,u.default)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]),d=(0,u.default)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);var p=e.i(37727),f=e.i(98919),h=e.i(7486),m=e.i(32095),y=e.i(12717),g=e.i(5766);function x(){let[e,u]=(0,r.useState)(!1),[x,b]=(0,r.useState)(!1),{user:v,userProfile:w,logout:j,isStudent:E,isLandlord:k,isAdmin:C}=(0,y.useAuth)(),P=(0,i.usePathname)();async function N(){await j(),g.default.success("Logged out successfully")}(0,r.useEffect)(()=>{let e=()=>b(window.scrollY>20);return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]);let S=[{href:"/",label:"Home",icon:s.Home},{href:"/properties",label:"Browse",icon:l.Search},...E?[{href:"/student",label:"My Reservations",icon:m.GraduationCap}]:[],...k?[{href:"/landlord",label:"Dashboard",icon:h.Building2}]:[],...C?[{href:"/admin",label:"Admin",icon:f.Shield}]:[]];return(0,t.jsxs)(a.motion.nav,{initial:{y:-100},animate:{y:0},transition:{type:"spring",stiffness:100,damping:20},className:`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${x?"glass shadow-lg":"bg-transparent"}`,children:[(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-16",children:[(0,t.jsxs)(n.default,{href:"/",className:"flex items-center gap-2",children:[(0,t.jsx)(a.motion.div,{whileHover:{rotate:360},transition:{duration:.5},className:"w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg",children:(0,t.jsx)("span",{className:"text-white font-display font-bold text-sm",children:"H"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"font-display font-bold text-lg text-gray-900",children:"HUZA"}),(0,t.jsx)("span",{className:"hidden sm:block text-xs text-gray-500 -mt-1 font-body",children:"Student Icumbi Connect"})]})]}),(0,t.jsx)("div",{className:"hidden md:flex items-center gap-1",children:S.map(({href:e,label:r,icon:i})=>(0,t.jsx)(n.default,{href:e,children:(0,t.jsxs)(a.motion.div,{whileHover:{scale:1.05},whileTap:{scale:.95},className:`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${P===e?"bg-primary-500 text-white shadow-md":"text-gray-600 hover:bg-primary-50 hover:text-primary-500"}`,children:[(0,t.jsx)(i,{size:16}),r]})},e))}),(0,t.jsx)("div",{className:"hidden md:flex items-center gap-3",children:v?(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl",children:[(0,t.jsx)("div",{className:"w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center",children:(0,t.jsx)("span",{className:"text-white text-xs font-bold",children:w?.name?.[0]||v.email?.[0]?.toUpperCase()})}),(0,t.jsx)("span",{className:"text-sm font-semibold text-gray-700",children:w?.name?.split(" ")[0]||"User"}),w?.role&&(0,t.jsx)("span",{className:`text-xs px-2 py-0.5 rounded-full font-bold ${C?"bg-red-100 text-red-600":k?"bg-accent-50 text-accent-500":"bg-secondary-50 text-secondary-500"}`,children:w.role})]}),(0,t.jsxs)(a.motion.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:N,className:"flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition-all",children:[(0,t.jsx)(c,{size:16}),"Logout"]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.default,{href:"/auth/login",children:(0,t.jsx)(a.motion.button,{whileHover:{scale:1.05},whileTap:{scale:.95},className:"px-4 py-2 text-primary-500 font-semibold text-sm hover:bg-primary-50 rounded-xl transition-all",children:"Login"})}),(0,t.jsx)(n.default,{href:"/auth/signup",children:(0,t.jsx)(a.motion.button,{whileHover:{scale:1.05,boxShadow:"0 8px 20px rgba(0,123,255,0.3)"},whileTap:{scale:.95},className:"px-4 py-2 bg-primary-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all",children:"Get Started"})})]})}),(0,t.jsx)(a.motion.button,{whileTap:{scale:.9},className:"md:hidden p-2 rounded-xl hover:bg-gray-100",onClick:()=>u(!e),children:e?(0,t.jsx)(p.X,{size:24}):(0,t.jsx)(d,{size:24})})]})}),(0,t.jsx)(o.AnimatePresence,{children:e&&(0,t.jsx)(a.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},className:"md:hidden glass border-t border-gray-100",children:(0,t.jsxs)("div",{className:"px-4 py-4 space-y-2",children:[S.map(({href:e,label:r,icon:i},o)=>(0,t.jsx)(a.motion.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.05*o},children:(0,t.jsxs)(n.default,{href:e,onClick:()=>u(!1),className:`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${P===e?"bg-primary-500 text-white":"text-gray-700 hover:bg-primary-50"}`,children:[(0,t.jsx)(i,{size:18}),r]})},e)),!v&&(0,t.jsxs)("div",{className:"flex gap-3 pt-2",children:[(0,t.jsx)(n.default,{href:"/auth/login",className:"flex-1",children:(0,t.jsx)("button",{className:"w-full py-2.5 border border-primary-500 text-primary-500 rounded-xl font-semibold",children:"Login"})}),(0,t.jsx)(n.default,{href:"/auth/signup",className:"flex-1",children:(0,t.jsx)("button",{className:"w-full py-2.5 bg-primary-500 text-white rounded-xl font-semibold",children:"Sign Up"})})]}),v&&(0,t.jsxs)("button",{onClick:()=>{N(),u(!1)},className:"w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold",children:[(0,t.jsx)(c,{size:18}),"Logout"]})]})})})]})}e.s(["default",()=>x],26122)}]);