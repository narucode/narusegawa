(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{177:function(u,e,D){"use strict";D.r(e);D(194),D(197),D(179),D(180),D(83),D(200),D(39),D(202),D(75),D(188),D(33);var t=D(0),n=D.n(t),r=D(182),o=D(208),a=D(226),c=D(211),F=D(189),E=D(190),i={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,comments:{lineComment:"--"},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"',notIn:["string"]},{open:"'",close:"'",notIn:["string"]}]},A=function(){function u(u){void 0===u&&(u=Object(E.getInitialTokenizeState)()),this.tokenizeState=u}var e=u.prototype;return e.clone=function(){return new u(Object(E.cloneTokenizeState)(this.tokenizeState))},e.equals=function(u){return Object(E.equalsTokenizeState)(this.tokenizeState,u.tokenizeState)},u}(),C={getInitialState:function(){return new A},tokenize:function(u,e){var D=Object(E.tokenize)(Object(F.characterize)(u),e.tokenizeState,Object(F.character)("\n"));return{tokens:Array.from(D).map(function(u){return{startIndex:u.col,scopes:l(u)}}),endState:e}}};function l(u){return s[u.type]}var s={whitespace:"white",newline:"white",comment:"comment.line.double-dash",opening_grouping:"punctuation.section.parens.begin",closing_grouping:"punctuation.section.parens.end",punctuation:"keyword.operator",keyword:"keyword",unquoted_name:"",quoted_name:"variable.other",placeholder_name:"variable.other",number_literal:"constant.numeric",quoted_literal:"string.quoted"};function B(u,e){return!(!f(e)||u!==e.start.offset)||!(u<e.start.offset)&&!(u>=e.end.offset)}function f(u){return u.start.offset===u.end.offset}var h=Object(t.memo)(function(u){var e=u.className,D=u.style,t=u.lineCap;return n.a.createElement("svg",{className:Object(r.cx)("stitlek",e),style:D,viewBox:"0 0 50 50"},n.a.createElement("circle",{className:"cpu1793",cx:25,cy:25,r:15,fill:"none",strokeWidth:5,strokeLinecap:t}))});D(144);e.default=function(){var u=Object(t.useState)(b),e=u[0],r=u[1],o=Object(t.useCallback)(function(u){return r(u)},[]),a=Object(t.useState)("characterize"),c=a[0],F=a[1],E=function(u){var e=Object(t.useRef)(),n=Object(t.useState)(null),r=n[0],o=n[1],a=Object(t.useCallback)(function(D,t){e.current=D;var n=D.getDomNode();Object.assign(n.style,{position:"absolute",width:"100%",height:"100%"});var r=function(){return o(function(u){var e=u.getSelection();if(!e)return null;var D=u.getModel();if(!D)return null;var t=e.getStartPosition(),n=e.getEndPosition();return{start:{offset:D.getOffsetAt(t),col:t.column-1,row:t.lineNumber-1},end:{offset:D.getOffsetAt(n),col:n.column-1,row:n.lineNumber-1}}}(D))};r(),D.onDidChangeCursorSelection(r),t.languages.register({id:"naru",extensions:[".n"],aliases:["Naru","n","naru"],mimetypes:["text/naru"]}),t.languages.setLanguageConfiguration("naru",i),t.languages.setTokensProvider("naru",C),u&&u(D,t)},[]);Object(t.useEffect)(function(){if(e.current){var u=e.current,D=function(){return u.layout()};return window.addEventListener("resize",D),function(){return window.removeEventListener("resize",D)}}},[e.current]);var c={theme:"vs-dark",editorDidMount:a};return{MonacoEditor:(F=Object(t.useState)(null),E=F[0],A=F[1],Object(t.useEffect)(function(){Promise.all([D.e(0),D.e(6)]).then(D.t.bind(null,228,7)).then(function(u){var e=u.default;return A(function(){return e})})},[]),E),selection:r,editorRef:e,props:c};var F,E,A}(),A=E.MonacoEditor,l=E.props,s=E.selection;return n.a.createElement("div",{className:"d5x8bgl"},n.a.createElement(m,{className:"c1d2hzl"},A?n.a.createElement(A,Object.assign({value:e,onChange:o,options:{language:"naru",fontSize:16}},l)):n.a.createElement(h,null)),n.a.createElement(m,{className:"ciojsz7"},n.a.createElement("div",null,n.a.createElement(d,{mode:"characterize",currentMode:c,setMode:F}),n.a.createElement(d,{mode:"tokenize",currentMode:c,setMode:F})),n.a.createElement("div",{className:"dwpy5w0"},"characterize"===c?n.a.createElement(p,{code:e,selection:s}):"tokenize"===c?n.a.createElement(g,{code:e,selection:s}):null)))};var d=Object(t.memo)(function(u){var e=u.mode,D=u.currentMode,o=u.setMode,a=Object(t.useCallback)(function(){return o(e)},[]);return n.a.createElement("button",{onClick:a,className:Object(r.cx)("b1ara1ia",e===D?"b64yd7s":"bl9oan3")},e)}),p=function(u){var e=u.code,D=u.selection,o=Array.from(Object(F.characterize)(e)),E=Object(t.useRef)(null),i=function(){if(C){if(l>=A.length)return"break";s=A[l++]}else{if((l=A.next()).done)return"break";s=l.value}var u=s;Object(t.useEffect)(function(){D&&(E.current&&E.current.scrollToItem(D[u].offset))},[D&&D[u].offset])},A=["start","end"],C=Array.isArray(A),l=0;for(A=C?A:A[Symbol.iterator]();;){var s;if("break"===i())break}var f=Object(t.useCallback)(Object(t.memo)(function(u){var e=u.index,t=u.style,a=o[e];return n.a.createElement("div",{style:t,className:Object(r.cx)("d1dkv8fv",D&&B(e,D)&&"d1fi4b3a")},n.a.createElement("div",{className:"d1uph50e"},a.char),n.a.createElement("div",{className:"d170quuu"},"U+",a.codePoint.toString(16).toUpperCase().padStart(4,"0")),n.a.createElement("div",{className:"d12wvk29"},a.type))}),[o]);return n.a.createElement(c.a,null,function(u){var e=u.width,D=u.height;return n.a.createElement(a.a,{ref:E,width:e,height:D,itemCount:o.length,itemSize:30},f)})},g=function(u){var e=u.code,D=u.selection,o=Array.from(Object(E.tokenize)(Object(F.characterize)(e))),i=Object(t.useRef)(null),A=function(){if(l){if(s>=C.length)return"break";B=C[s++]}else{if((s=C.next()).done)return"break";B=s.value}var u=B;Object(t.useEffect)(function(){if(D&&i.current){var e=i.current,t=D[u].offset,n=o.findIndex(function(u){return t<u.offset||t<u.offset+u.characters.length});~n&&e.scrollToItem(n)}},[D&&D[u].offset])},C=["start","end"],l=Array.isArray(C),s=0;for(C=l?C:C[Symbol.iterator]();;){var B;if("break"===A())break}var h=Object(t.useCallback)(Object(t.memo)(function(u){var e=u.index,t=u.style,a=o[e],c=D&&function(u,e,D){return f(D)?u<=D.start.offset&&e>D.start.offset:!(u>=D.end.offset||e<=D.start.offset)}(a.offset,a.offset+a.characters.length,D);return n.a.createElement("div",{style:t,className:Object(r.cx)("d1lam93",c&&"d14vhulk")},n.a.createElement("div",{className:"dx4e02"},a.characters.map(function(u){return u.char}).join("")),n.a.createElement("div",{className:"d659or6"},a.type))}),[o]);return n.a.createElement(c.a,null,function(u){var e=u.width,D=u.height;return n.a.createElement(a.a,{ref:i,width:e,height:D,itemCount:o.length,itemSize:30},h)})},m=Object(o.styled)("div")({name:"Column",class:"c77ob72"}),b='\noldint := use naru core 0 (int)\nhours := new type oldint\nmain := fn {\n    delay := hours(4)\n    #"#(delay)시간동안 기다리는 중" println()\n}\n'.trimLeft();D(145)},189:function(u,e,D){"use strict";D(212),D(179),D(180);var t=this&&this.__generator||function(u,e){var D,t,n,r,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(D)throw new TypeError("Generator is already executing.");for(;o;)try{if(D=1,t&&(n=2&r[0]?t.return:r[0]?t.throw||((n=t.return)&&n.call(t),0):t.next)&&!(n=n.call(t,r[1])).done)return n;switch(t=0,n&&(r=[2&r[0],n.value]),r[0]){case 0:case 1:n=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,t=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!(n=(n=o.trys).length>0&&n[n.length-1])&&(6===r[0]||2===r[0])){o=0;continue}if(3===r[0]&&(!n||r[1]>n[0]&&r[1]<n[3])){o.label=r[1];break}if(6===r[0]&&o.label<n[1]){o.label=n[1],n=r;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(r);break}n[2]&&o.ops.pop(),o.trys.pop();continue}r=e.call(u,o)}catch(a){r=[6,a],t=0}finally{D=n=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}},n=this&&this.__values||function(u){var e="function"==typeof Symbol&&u[Symbol.iterator],D=0;return e?e.call(u):{next:function(){return u&&D>=u.length&&(u=void 0),{value:u&&u[D++],done:!u}}}};Object.defineProperty(e,"__esModule",{value:!0});var r=D(213);function o(u){return{type:a(u),char:u,codePoint:u.codePointAt(0)}}function a(u){if(r.closingGroupingRegex.test(u))return"closing_grouping";if(r.closingQuoteRegex.test(u))return"closing_quote";if(r.decimalDigitRegex.test(u))return"decimal_digit";if(r.horizontalSpaceRegex.test(u))return"horizontal_space";if(r.nameContinueRegex.test(u))return"name_continue";if(r.nameStartRegex.test(u))return"name_start";if(r.openingGroupingRegex.test(u))return"opening_grouping";if(r.openingQuoteRegex.test(u))return"opening_quote";if(r.punctuationRegex.test(u))return"punctuation";if(r.togglingQuoteRegex.test(u))return"toggling_quote";if(r.verticalSpaceRegex.test(u))return"vertical_space";throw new Error("unknown character: "+u)}e.characterize=function(u){var e,D,r,a,c;return t(this,function(t){switch(t.label){case 0:t.trys.push([0,5,6,7]),r=n(u),a=r.next(),t.label=1;case 1:return a.done?[3,4]:[4,o(a.value)];case 2:t.sent(),t.label=3;case 3:return a=r.next(),[3,1];case 4:return[3,7];case 5:return c=t.sent(),e={error:c},[3,7];case 6:try{a&&!a.done&&(D=r.return)&&D.call(r)}finally{if(e)throw e.error}return[7];case 7:return[2]}})},e.character=o,e.characterType=a},190:function(u,e,D){"use strict";D(92),D(83),D(58),D(39),D(75),D(214),D(179),D(180),D(33);var t=this&&this.__assign||function(){return(t=Object.assign||function(u){for(var e,D=1,t=arguments.length;D<t;D++)for(var n in e=arguments[D])Object.prototype.hasOwnProperty.call(e,n)&&(u[n]=e[n]);return u}).apply(this,arguments)},n=this&&this.__generator||function(u,e){var D,t,n,r,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(D)throw new TypeError("Generator is already executing.");for(;o;)try{if(D=1,t&&(n=2&r[0]?t.return:r[0]?t.throw||((n=t.return)&&n.call(t),0):t.next)&&!(n=n.call(t,r[1])).done)return n;switch(t=0,n&&(r=[2&r[0],n.value]),r[0]){case 0:case 1:n=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,t=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!(n=(n=o.trys).length>0&&n[n.length-1])&&(6===r[0]||2===r[0])){o=0;continue}if(3===r[0]&&(!n||r[1]>n[0]&&r[1]<n[3])){o.label=r[1];break}if(6===r[0]&&o.label<n[1]){o.label=n[1],n=r;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(r);break}n[2]&&o.ops.pop(),o.trys.pop();continue}r=e.call(u,o)}catch(a){r=[6,a],t=0}finally{D=n=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}},r=this&&this.__values||function(u){var e="function"==typeof Symbol&&u[Symbol.iterator],D=0;return e?e.call(u):{next:function(){return u&&D>=u.length&&(u=void 0),{value:u&&u[D++],done:!u}}}},o=this&&this.__read||function(u,e){var D="function"==typeof Symbol&&u[Symbol.iterator];if(!D)return u;var t,n,r=D.call(u),o=[];try{for(;(void 0===e||e-- >0)&&!(t=r.next()).done;)o.push(t.value)}catch(a){n={error:a}}finally{try{t&&!t.done&&(D=r.return)&&D.call(r)}finally{if(n)throw n.error}}return o},a=this&&this.__spread||function(){for(var u=[],e=0;e<arguments.length;e++)u=u.concat(o(arguments[e]));return u};function c(){return{current:null,context:F(),offset:0,col:0,row:0}}function F(){return{blocks:[{keywords:new Set(["assert","break","continue","else","false","fn","for","if","new","package","pub","return","static","switch","syntax","test","true","type","use","var","yield"])}]}}function E(u,e){return!!u.blocks.find(function(u){return u.keywords.has(e)})}Object.defineProperty(e,"__esModule",{value:!0}),e.eof={type:"<EOF>",char:"",codePoint:-1},e.getInitialTokenizeState=c,e.tokenize=function(u,D,t){var a,F,E,C,l,s,B,f,h,d,p;return n(this,function(n){switch(n.label){case 0:void 0===D&&(D=c()),void 0===t&&(t=e.eof),n.label=1;case 1:n.trys.push([1,8,9,10]),E=r(u),C=E.next(),n.label=2;case 2:if(C.done)return[3,7];l=C.value,n.label=3;case 3:return n.trys.push([3,,5,6]),D.current?(s=o(A[D.current.type](l,D.current,D.context),2),B=s[0],(p=s[1])&&(D.current.type=p),"continue"===B?(D.current.characters.push(l),[3,6]):[4,D.current]):(D.current={type:i[l.type](l),characters:[l],offset:D.offset,col:D.col,row:D.row},[3,6]);case 4:return n.sent(),f="newline"===D.current.type,D.current={type:i[l.type](l),characters:[l],offset:D.offset,col:D.col,row:D.row},f&&(D.col=-1,++D.row),[3,6];case 5:return++D.offset,++D.col,[7];case 6:return C=E.next(),[3,2];case 7:return[3,10];case 8:return h=n.sent(),a={error:h},[3,10];case 9:try{C&&!C.done&&(F=E.return)&&F.call(E)}finally{if(a)throw a.error}return[7];case 10:if(!t)return[2];n.label=11;case 11:return n.trys.push([11,,13,14]),D.current?((d=o(A[D.current.type](t,D.current,D.context),2))[0],(p=d[1])&&(D.current.type=p),[4,D.current]):[2];case 12:return n.sent(),[3,14];case 13:return D.current=null,D.offset=0,D.col=0,D.row=0,[7];case 14:return[2]}})},e.getInitialSyntacticContext=F,e.hasKeyword=E;var i={closing_grouping:function(){return"closing_grouping"},closing_quote:function(){throw new Error},decimal_digit:function(){return"number_literal"},horizontal_space:function(){return"whitespace"},name_continue:function(){throw new Error},name_start:function(){return"unquoted_name"},opening_grouping:function(){return"opening_grouping"},opening_quote:function(){return"quoted_literal"},punctuation:function(){return"punctuation"},toggling_quote:function(u){return"`"===u.char?"quoted_name":"quoted_literal"},vertical_space:function(){return"newline"}},A={whitespace:function(u){return"horizontal_space"===u.type?["continue",null]:["emit","whitespace"]},newline:function(u,e){return"\r"===e.characters[0].char&&"\n"===u.char?["continue",null]:["emit","newline"]},comment:function(u){return"vertical_space"!==u.type?["continue",null]:["emit","comment"]},opening_grouping:function(u){return"opening_grouping"===u.type?["continue",null]:["emit","opening_grouping"]},closing_grouping:function(u){return"closing_grouping"===u.type?["continue",null]:["emit","closing_grouping"]},punctuation:function(u,e){return"punctuation"===u.type?1===e.characters.length&&"-"===e.characters[0].char&&"-"===u.char?["continue","comment"]:["continue",null]:["emit","punctuation"]},keyword:function(){throw new Error},unquoted_name:function(u,e,D){return"name_start"===u.type||"name_continue"===u.type||"decimal_digit"===u.type?["continue",null]:1===e.characters.length&&"_"===e.characters[0].char?["emit","placeholder_name"]:E(D,e.characters.map(function(u){return u.char}).join(""))?["emit","keyword"]:["emit","unquoted_name"]},quoted_name:function(u,e){return 1===e.characters.length?["continue",null]:"`"!==e.characters[e.characters.length-1].char?["continue",null]:["emit","quoted_name"]},placeholder_name:function(){throw new Error},number_literal:function(u){return"decimal_digit"===u.type?["continue",null]:["emit","number_literal"]},quoted_literal:function(u,e){return 1===e.characters.length?["continue",null]:e.characters[0].char!==e.characters[e.characters.length-1].char?["continue",null]:["emit","quoted_literal"]}};function C(u){return{type:u.type,characters:a(u.characters),offset:u.offset,col:u.col,row:u.row}}function l(u,e){return u?e?u.type===e.type&&(u.offset===e.offset&&(u.col===e.col&&(u.row===e.row&&(u.characters.length===e.characters.length&&B(u.characters.values(),e.characters.values()))))):!u:!e}function s(u){return{keywords:new Set(a(u.keywords))}}function B(u,e){var D,t,n;do{if(t=(D=o([u.next(),e.next()],2))[0],n=D[1],t.value!==n.value)return!1;if(t.done!==n.done)return!1}while(!t.done);return!0}e.cloneTokenizeState=function(u){return t({},u,{current:u.current&&C(u.current)})},e.equalsTokenizeState=function(u,e){return u.offset===e.offset&&u.col===e.col&&u.row===e.row&&l(u.current,e.current)},e.cloneToken=C,e.equalsToken=l,e.cloneSyntacticContext=function(u){return{blocks:u.blocks.map(s)}},e.equalsSyntacticContext=function(u,e){return u.blocks.length===e.blocks.length&&B(u.blocks.values(),e.blocks.values())},e.cloneSyntacticContextBlock=s,e.equalsSyntacticContextBlock=function(u,e){return u.keywords.size===e.keywords.size&&B(u.keywords.values(),e.keywords.values())}},213:function(u,e,D){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.closingGroupingRegex=/[\)\]\}\u2046\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E]/,e.closingQuoteRegex=/[\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21]/,e.decimalDigitRegex=/(?:[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD801[\uDCA0-\uDCA9]|\uD803[\uDD30-\uDD39]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|[\uD805\uD807][\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD838[\uDD40-\uDD49\uDEF0-\uDEF9]|\uD83A[\uDD50-\uDD59])/,e.horizontalSpaceRegex=/[\t \xA0\u200E\u200F\uFEFF]/,e.nameContinueRegex=/(?:[\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD803[\uDD24-\uDD27\uDF46-\uDF50]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD45\uDD46\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDDC9-\uDDCC\uDE2C-\uDE37\uDE3E\uDEDF-\uDEEA\uDF00-\uDF03\uDF3B\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC35-\uDC46\uDC5E\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDDDC\uDDDD\uDE30-\uDE40\uDEAB-\uDEB7\uDF1D-\uDF2B]|\uD806[\uDC2C-\uDC3A\uDDD1-\uDDD7\uDDDA-\uDDE0\uDDE4\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE3E\uDE47\uDE51-\uDE5B\uDE8A-\uDE99]|\uD807[\uDC2F-\uDC36\uDC38-\uDC3F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD31-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD45\uDD47\uDD8A-\uDD8E\uDD90\uDD91\uDD93-\uDD97\uDEF3-\uDEF6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF4F\uDF51-\uDF87\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDD30-\uDD36\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF])/,e.nameStartRegex=/(?:[A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])/,e.openingGroupingRegex=/[\(\[\{\u201A\u201E\u2045\u2308\u230A\u2329\u2768\u276A\u276C\u276E\u2770\u2772\u2774\u27C5\u27E6\u27E8\u27EA\u27EC\u27EE\u2983\u2985\u2987\u2989\u298B\u298D\u298F\u2991\u2993\u2995\u2997\u29D8\u29DA\u29FC\u2E22\u2E24\u2E26\u2E28\u2E42\u3008\u300A\u300C\u300E\u3010\u3014\u3016\u3018\u301A\u301D\uFD3F]/,e.openingQuoteRegex=/[\xAB\u2018\u201B\u201C\u201F\u2039\u2E02\u2E04\u2E09\u2E0C\u2E1C\u2E20]/,e.punctuationRegex=/[!#-&\*-\/:-@\\\^\|~\xA1-\xA7\xA9\xAC\xAE\xB0\xB1\xB6\xBF\xD7\xF7\u2010-\u2017\u2020-\u2027\u2030-\u2038\u203B-\u203E\u2041-\u2044\u2047-\u2053\u2055-\u205E\u2190-\u2307\u230C-\u2328\u232B-\u245F\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2BFF\u2E00\u2E01\u2E06-\u2E08\u2E0B\u2E0E-\u2E1B\u2E1E\u2E1F\u2E2A-\u2E41\u2E43-\u2E7F\u3001-\u3003\u3012\u3013\u301C\u3020\u3030\uFE45\uFE46]/,e.togglingQuoteRegex=/["'`]/,e.verticalSpaceRegex=/[\n-\r\x85\u2028\u2029]/}}]);
//# sourceMappingURL=component---src-pages-index-tsx-7e849c9442205f7f833c.js.map