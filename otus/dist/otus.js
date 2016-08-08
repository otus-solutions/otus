!function(){angular.module("otus",["dependencies","otus.dashboard","otus.installer","otus.authenticator","otusjs.otus.singup","otus.client","otusDomainClient","otus.participant.search"])}(),function(){"use strict";angular.module("otus.authenticator",[])}(),function(){angular.module("dependencies",["ngMaterial","ngMessages","ngAnimate","ui.router","ui.mask","passwordControl","lokijs","indexedDB"])}(),function(t){t.__env=t.__env||{},t.__env.apiUrl="http://studio-dev.ccem.ufrgs.br"}(this),function(){function t(t,e){var n=e.__env;t.setUrl(n.apiUrl)}angular.module("otus").run(["OtusRestResourceService","$window",t])}(),function(){function t(t){t.formatDate=function(t){return moment(t).format("DD/MM/YYYY")},t.parseDate=function(t){var e=moment(t,"DD/MM/YYYY",!0);return e.isValid()?e.toDate():new Date(NaN)}}angular.module("otus").config(["$mdDateLocaleProvider",t])}(),function(){"use strict";function t(t,e,n,r,o){var i=this;i.loggedUser=function(){var t=n.defer();return o.isLogged()?t.resolve():t.reject({redirectTo:r.LOGIN}),t.promise},i.alreadyLogged=function(){var t=n.defer();return o.isLogged()?t.reject({redirectTo:r.HOME}):t.resolve(),t.promise},i.initialConfiguration=function(){var t=n.defer(),e=o.getOtusInstallerResource();return e.ready(function(e){e.data?t.resolve():t.reject({redirectTo:r.INSTALLER})}),t.promise},i.onlyOneConfiguration=function(){var t=n.defer(),e=o.getOtusInstallerResource();return e.ready(function(e){e.data?t.reject({redirectTo:r.LOGIN}):t.resolve()}),t.promise},t.$on("$stateChangeError",function(t,n,r,o,i,u){t.preventDefault(),u.redirectTo?e.go(u.redirectTo):e.go("error",{status:u.status})})}angular.module("otus").service("RouteRulesResolver",t),t.$inject=["$rootScope","$state","$q","APP_STATE","OtusRestResourceService"]}(),function(){function t(t,e,n){t.state("installer",{url:"/installer",resolve:{onlyOneConfiguration:function(t){return t.onlyOneConfiguration()}},views:{"system-wrap":{templateUrl:"app/installer/initial/initial-config.html",controller:"InitialConfigController",controllerAs:"controller"}}}).state("login",{url:"/login",resolve:{initialConfiguration:function(t){return t.initialConfiguration()},alreadyLogged:function(t){return t.alreadyLogged()}},views:{"system-wrap":{templateUrl:"app/authenticator/login/login.html",controller:"LoginController as $ctrl"}}}).state("home",{url:"/home",resolve:{loggedUser:function(t){return t.loggedUser()}},views:{"system-wrap":{templateUrl:"app/dashboard/home/main-home-content-template.html"},"dashboard-menu@home":{templateUrl:"app/dashboard/menu/dashboard-menu.html",controller:"OtusDashboardMenu",controllerAs:"dashboardMenu"}}}).state("signup",{url:"/signup",resolve:{initialConfiguration:function(t){return t.initialConfiguration()}},views:{"system-wrap":{templateUrl:"app/user/signup/signup.html",controller:"SignupController as $ctrl"}}}).state("signup-result",{url:"/signup-result",resolve:{initialConfiguration:function(t){return t.initialConfiguration()}},views:{"system-wrap":{templateUrl:"app/user/signup/signup-result.html",controller:"SignupController as $ctrl"}}}),e.otherwise("/login")}angular.module("otus").config(["$stateProvider","$urlRouterProvider","$locationProvider",t]).constant("APP_STATE",{HOME:"home",INSTALLER:"installer",LOGIN:"login",SIGNUP:"signup",SIGNUP_RESULT:"signup-result"})}(),function(){function t(t,e){t.theme("layoutTheme").primaryPalette("cyan",{"default":"900","hue-1":"400"}).accentPalette("blue-grey",{"default":"900","hue-1":"50"}).warnPalette("red"),e.defaultIconSet("app/assets/img/icons/mdi.svg",24)}angular.module("otus").config(["$mdThemingProvider","$mdIconProvider",t])}(),function(){"use strict";angular.module("otus.dashboard",[])}(),function(){"use strict";angular.module("otus.installer",[])}(),angular.module("passwordControl",[]).directive("stPassword",function(){return{require:"ngModel",restrict:"A",link:function(t,e,n,r){var o=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;t.$watch(function(){return r.$modelValue},function(t){o.test(t)&&t.length>=6&&t.length<=32?r.$setValidity("passwordPattern",!0):r.$setValidity("passwordPattern",!1)})}}}).directive("stPasswordMatch",function(){return{require:"ngModel",restrict:"A",scope:{stPasswordMatch:"="},link:function(t,e,n,r){function o(t,e){t!=e?r.$setValidity("passwordMatch",!1):r.$setValidity("passwordMatch",!0)}t.$watch(function(){return t.stPasswordMatch},function(t){o(t,r.$modelValue)}),t.$watch(function(){return r.$modelValue},function(e){o(t.stPasswordMatch,e)})}}}),function(){"use strict";function t(t,e,n){function r(r){var o=e.getOtusAuthenticatorResource();o.authenticate(r,function(r){e.setSecurityToken(r.data),r.hasErrors?n.show(n.simple().textContent(u)):t.goToHome()},function(){n.show(n.simple().textContent(a))})}function o(){t.goToSignup()}var i=this,u="Login Inválido! Verifique os dados informados.",a="Erro interno do servidor.";i.authenticate=r,i.signup=o}angular.module("otus.authenticator").controller("LoginController",t),t.$inject=["DashboardStateService","OtusRestResourceService","$mdToast"]}(),function(){"use strict";function t(t,e,n,r){function o(){l.currentState="Login"}function i(){l.currentState="Login",t.go(n.LOGIN)}function u(){l.currentState="Home",t.go(n.HOME)}function a(){l.currentState="Instalador do Sistema",t.go(n.INSTALLER)}function s(){l.currentState="Instalador do Sistema",t.go(n.SIGNUP)}function c(){l.currentState="Instalador do Sistema",t.go(n.SIGNUP_RESULT)}var l=this;l.goToLogin=i,l.goToInstaller=a,l.goToHome=u,l.goToSignup=s,l.goToSignupResult=c,o()}angular.module("otus.dashboard").service("DashboardStateService",t),t.$inject=["$state","$http","APP_STATE","OtusRestResourceService"]}(),function(){"use strict";function t(t){function e(){t("left").toggle()}var n=this;n.open=e}angular.module("otus.dashboard").controller("OtusDashboardMenu",t),t.$inject=["$mdSidenav"]}(),function(){"use strict";function t(t){function e(){t("left").toggle()}var n=this;n.open=e}angular.module("otus.dashboard").controller("OtusDashboardToolbar",t),t.$inject=["$mdSidenav"]}(),function(){"use strict";function t(){var t={templateUrl:"app/dashboard/toolbar/dashboard-toolbar.html",retrict:"E",controller:"OtusDashboardToolbar",controllerAs:"dashboardToolbar"};return t}angular.module("otus.dashboard").directive("otusToolbar",t)}(),function(){"use strict";function t(t,e,n,r,o,i,u,a){function s(){g=e.getOtusInstallerResource()}function c(t){o.isLoading=!0,delete t.userPasswordConfirm,p(t).then(function(){l(t.domain.domainRestUrl).then(function(){g.config(t,function(t){t.hasErrors?h(y):f()},function(){h(MESSAGE_CONNECTION)})})},function(){o.isLoading=!1})}function l(t){n.setHostname(t),m=n.getUrlResource();var e=u.defer();return m.isValidDomain(function(t){e.resolve(!0)},function(){o.initialConfigForm.urlProject.$setValidity("domainAccess",!1),e.reject(!1)}),e.promise}function p(t){var e=u.defer();return g.validation(t,function(t){t.data?(d(),e.resolve(!0)):("ADM_USER_EMAIL"===t.data.errorType&&o.initialConfigForm.email.$setValidity("email",!1),"SENDER_EMAIL"===t.data.errorType&&o.initialConfigForm.email.$setValidity("emailSenderEmail",!1),e.reject(!1))}),e.promise}function d(){o.initialConfigForm.email.$setValidity("email",!0),o.initialConfigForm.$setValidity("email",!0)}function f(){alert=a.alert().title("Informação").content($).ok("ok"),a.show(alert)["finally"](function(){t.goToLogin()})}function h(t){i.show(i.simple().textContent(t))}var g,m,v=this,y="Erro ao adicionar novas configurações",$="Suas configurações foram realizadas com sucesso! Você vai ser redirecionado para a tela de login.";v.register=c,s()}angular.module("otus.installer").controller("InitialConfigController",t),t.$inject=["DashboardStateService","OtusRestResourceService","RestResourceService","$http","$scope","$mdToast","$q","$mdDialog"]}(),function(){"use strict";angular.module("otus.participant.search",[])}(),function(){"use strict";var t=[].slice;angular.module("indexedDB",[]).provider("$indexedDB",function(){var e,n,r,o,i,u,a,s,c,l,p,d,f,h,g,m;h=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,e=window.IDBKeyRange||window.mozIDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange,s={readonly:"readonly",readwrite:"readwrite"},g={pending:"pending"},u={next:"next",nextunique:"nextunique",prev:"prev",prevunique:"prevunique"},r={ascending:u.next,descending:u.prev},c="",p=1,a=null,m={},l=null,n=[],d={useIndex:void 0,keyRange:null,direction:u.next},i=function(t,e,n,r,o){var i;for(i in m)!m.hasOwnProperty(i)||t>=i||(o.log("$indexedDB: Running upgrade : "+i+" from "+t),m[i](e,n,r))},f=function(t){return t.target.readyState===g.pending?"Error: Operation pending":t.target.webkitErrorMessage||t.target.error.message||t.target.errorCode},o=function(t,e){return void 0!==e?t.then(function(){return e}):t},this.connection=function(t){return c=t,this},this.upgradeDatabase=function(t,e){return m[t]=e,p=Math.max.apply(null,Object.keys(m)),this},this.$get=["$q","$rootScope","$log",function(g,m,v){var y,$,S,w,b,C,R,T,j,D,I,E;return I=function(t){return function(e){return m.$apply(function(){return t.reject(f(e))})}},R=function(){var t,e;return e=g.defer(),t=h.open(c,parseInt(p)||1),t.onsuccess=function(){a=t.result,m.$apply(function(){e.resolve(a)})},t.onblocked=t.onerror=I(e),t.onupgradeneeded=function(t){var e;a=t.target.result,e=t.target.transaction,v.log("$indexedDB: Upgrading database '"+a.name+"' from version "+t.oldVersion+" to version "+t.newVersion+" ..."),i(t.oldVersion,t,a,e,v)},e.promise},j=function(){return l||(l=R())},C=function(){return j().then(function(){return a.close(),a=null,l=null})},E=function(t){var e,n,r,o;for(e=!0,r=0,o=t.length;o>r;r++)n=t[r],e&=a.objectStoreNames.contains(n);return e},D=function(t,e){return null==e&&(e=s.readonly),j().then(function(){return E(t)?new w(t,e):g.reject("Object stores "+t+" do not exist.")})},T=function(t){return t.beginKey&&t.endKey?e.bound(t.beginKey,t.endKey):void 0},b=function(t){return n.push(t.promise),t.promise["finally"](function(){var e;return e=n.indexOf(t.promise),e>-1?n.splice(e,1):void 0})},w=function(){function t(t,e){null==e&&(e=s.readonly),this.transaction=a.transaction(t,e),this.defer=g.defer(),this.promise=this.defer.promise,this.setupCallbacks()}return t.prototype.setupCallbacks=function(){return this.transaction.oncomplete=function(t){return function(){return m.$apply(function(){return t.defer.resolve("Transaction Completed")})}}(this),this.transaction.onabort=function(t){return function(e){return m.$apply(function(){return t.defer.reject("Transaction Aborted",e)})}}(this),this.transaction.onerror=function(t){return function(e){return m.$apply(function(){return t.defer.reject("Transaction Error",e)})}}(this),b(this)},t.prototype.objectStore=function(t){return this.transaction.objectStore(t)},t.prototype.abort=function(){return this.transaction.abort()},t}(),y=function(){function e(){this.q=g.defer(),this.promise=this.q.promise}return e.prototype.reject=function(){var e;return e=1<=arguments.length?t.call(arguments,0):[],m.$apply(function(t){return function(){var n;return(n=t.q).reject.apply(n,e)}}(this))},e.prototype.rejectWith=function(t){return t.onerror=t.onblocked=function(t){return function(e){return t.reject(f(e))}}(this)},e.prototype.resolve=function(){var e;return e=1<=arguments.length?t.call(arguments,0):[],m.$apply(function(t){return function(){var n;return(n=t.q).resolve.apply(n,e)}}(this))},e.prototype.notify=function(){var e;return e=1<=arguments.length?t.call(arguments,0):[],m.$apply(function(t){return function(){var n;return(n=t.q).notify.apply(n,e)}}(this))},e.prototype.dbErrorFunction=function(){return function(t){return function(e){return m.$apply(function(){return t.q.reject(f(e))})}}(this)},e.prototype.resolveWith=function(t){return this.rejectWith(t),t.onsuccess=function(t){return function(e){return t.resolve(e.target.result)}}(this)},e}(),$=function(){function t(t,e){this.storeName=t,this.store=e.objectStore(t),this.transaction=e}return t.prototype.defer=function(){return new y},t.prototype._mapCursor=function(t,e,n){var r;return null==n&&(n=this.store.openCursor()),r=[],t.rejectWith(n),n.onsuccess=function(n){var o;return(o=n.target.result)?(r.push(e(o)),t.notify(e(o)),o["continue"]()):t.resolve(r)}},t.prototype._arrayOperation=function(t,e){var n,r,o,i,u,a;for(n=this.defer(),angular.isArray(t)||(t=[t]),u=0,a=t.length;a>u;u++)r=t[u],o=e(r),i=[],n.rejectWith(o),o.onsuccess=function(e){return i.push(e.target.result),n.notify(e.target.result),i.length>=t.length?n.resolve(i):void 0};return 0===t.length?g.when([]):n.promise},t.prototype.getAllKeys=function(){var t,e;return t=this.defer(),this.store.getAllKeys?(e=this.store.getAllKeys(),t.resolveWith(e)):this._mapCursor(t,function(t){return t.key}),t.promise},t.prototype.clear=function(){var t,e;return t=this.defer(),e=this.store.clear(),t.resolveWith(e),t.promise},t.prototype["delete"]=function(t){var e;return e=this.defer(),e.resolveWith(this.store["delete"](t)),e.promise},t.prototype.upsert=function(t){return this._arrayOperation(t,function(t){return function(e){return t.store.put(e)}}(this))},t.prototype.insert=function(t){return this._arrayOperation(t,function(t){return function(e){return t.store.add(e)}}(this))},t.prototype.getAll=function(){var t;return t=this.defer(),this.store.getAll?t.resolveWith(this.store.getAll()):this._mapCursor(t,function(t){return t.value}),t.promise},t.prototype.eachWhere=function(t){var e,n,r,o,i;return e=this.defer(),r=t.indexName,o=t.keyRange,n=t.direction,i=r?this.store.index(r).openCursor(o,n):this.store.openCursor(o,n),this._mapCursor(e,function(t){return t.value},i),e.promise},t.prototype.findWhere=function(t){return this.eachWhere(t)},t.prototype.each=function(t){return null==t&&(t={}),this.eachBy(void 0,t)},t.prototype.eachBy=function(t,e){var n;return null==t&&(t=void 0),null==e&&(e={}),n=new S,n.indexName=t,n.keyRange=T(e),n.direction=e.direction||d.direction,this.eachWhere(n)},t.prototype.count=function(){var t;return t=this.defer(),t.resolveWith(this.store.count()),t.promise},t.prototype.find=function(t){var e,n;return e=this.defer(),n=this.store.get(t),e.rejectWith(n),n.onsuccess=function(n){return function(r){return r.target.result?e.resolve(r.target.result):e.reject(""+n.storeName+":"+t+" not found.")}}(this),e.promise},t.prototype.findBy=function(t,e){var n;return n=this.defer(),n.resolveWith(this.store.index(t).get(e)),n.promise},t.prototype.query=function(){return new S},t}(),S=function(){function t(){this.indexName=void 0,this.keyRange=void 0,this.direction=u.next}return t.prototype.$lt=function(t){return this.keyRange=e.upperBound(t,!0),this},t.prototype.$gt=function(t){return this.keyRange=e.lowerBound(t,!0),this},t.prototype.$lte=function(t){return this.keyRange=e.upperBound(t),this},t.prototype.$gte=function(t){return this.keyRange=e.lowerBound(t),this},t.prototype.$eq=function(t){return this.keyRange=e.only(t),this},t.prototype.$between=function(t,n,r,o){return null==r&&(r=!1),null==o&&(o=!1),this.keyRange=e.bound(t,n,r,o),this},t.prototype.$desc=function(t){return this.direction=t?u.prevunique:u.prev,this},t.prototype.$asc=function(t){return this.direction=t?u.nextunique:u.next,this},t.prototype.$index=function(t){return this.indexName=t,this},t}(),{openStore:function(t,e,n){return null==n&&(n=s.readwrite),D([t],n).then(function(n){var r;return r=e(new $(t,n)),o(n.promise,r)})},openStores:function(t,e,n){return null==n&&(n=s.readwrite),D(t,n).then(function(n){var r,i,u;return r=function(){var e,r,o;for(o=[],e=0,r=t.length;r>e;e++)u=t[e],o.push(new $(u,n));return o}(),i=e.apply(null,r),o(n.promise,i)})},openAllStores:function(t,e){return null==e&&(e=s.readwrite),j().then(function(n){return function(){var n,r,i,u,s;return u=Array.prototype.slice.apply(a.objectStoreNames),s=new w(u,e),n=function(){var t,e,n;for(n=[],t=0,e=u.length;e>t;t++)i=u[t],n.push(new $(i,s));return n}(),r=t.apply(null,n),o(s.promise,r)}}(this))},closeDatabase:function(){return C()},deleteDatabase:function(){return C().then(function(){var t;return t=new y,t.resolveWith(h.deleteDatabase(c)),t.promise})["finally"](function(){return v.log("$indexedDB: "+c+" database deleted.")})},queryDirection:r,flush:function(){return n.length>0?g.all(n):g.when([])},databaseInfo:function(){return j().then(function(){var t,e;return e=null,t=Array.prototype.slice.apply(a.objectStoreNames),D(t,s.readonly).then(function(e){var n,r,o;return o=function(){var o,i,u;for(u=[],o=0,i=t.length;i>o;o++)r=t[o],n=e.objectStore(r),u.push({name:r,keyPath:n.keyPath,autoIncrement:n.autoIncrement,indices:Array.prototype.slice.apply(n.indexNames)});return u}(),e.promise.then(function(){return{name:a.name,version:a.version,objectStores:o}})})})}}}]})}.call(this),function(){"use strict";function t(t,e,n){function r(r){u.isWaiting=!0,n.executeSignup(r).then(function(t){e.goToSignupResult()},function(e){t.signupForm.email.$setValidity("email",!1),u.isWaiting=!1})}function o(){e.goToLogin()}function i(){e.goToLogin()}var u=this;u.signup=r,u.back=o,u.agree=i}angular.module("otusjs.otus.singup").controller("SignupController",t),t.$inject=["$scope","DashboardStateService","SignupService"]}(),function(){"use strict";angular.module("otusjs.otus.singup",[])}(),function(){"use strict";function t(t,e){function n(n){var r=e.getUserResource(),o=t.defer();return r.create(n,function(t){t.hasErrors?o.reject(t):o.resolve(t)}),o.promise}var r=this;r.executeSignup=n}angular.module("otusjs.otus.singup").service("SignupService",t),t.$inject=["$q","OtusRestResourceService"]}(),function(){"use strict";function t(t){function e(e){t.cancel()}var n=this;n.close=e,n.participants=["Joao","Fernando","Maria"]}angular.module("otus.participant.search").controller("SearchCustomController",t),t.$inject=["$mdDialog"]}(),function(){"use strict";function t(){var t={templateUrl:"app/participant/search/filters/birthdate-filter.html",retrict:"E"};return t}angular.module("otus.participant.search").directive("otusBirthdateFilter",t)}(),function(){"use strict";function t(){var t={templateUrl:"app/participant/search/filters/field-center-filter.html",retrict:"E"};return t}angular.module("otus.participant.search").directive("otusFieldCenterFilter",t)}(),function(){"use strict";function t(){var t={templateUrl:"app/participant/search/filters/name-filter.html",retrict:"E"};return t}angular.module("otus.participant.search").directive("otusNameFilter",t)}(),function(){"use strict";function t(){var t={templateUrl:"app/participant/search/filters/recruitment-number-filter.html",retrict:"E"};return t}angular.module("otus.participant.search").directive("otusRecruitmentNumberFilter",t)}(),function(){"use strict";function t(){var t={templateUrl:"app/participant/search/result/participant-card.html",retrict:"E"};return t}angular.module("otus.participant.search").directive("otusParticipantCard",t)}(),function(){"use strict";function t(t){function e(e){t.show({controller:"SearchCustomController",controllerAs:"searchCustom",templateUrl:"app/participant/search/dialog/search-custom-dialog.html",targetEvent:e,clickOutsideToClose:!0})}var n=this;n.openCustomSearch=e}angular.module("otus.participant.search").controller("SearchToolbarController",t),t.$inject=["$mdDialog"]}(),function(){"use strict";function t(){var t={templateUrl:"app/participant/search/toolbar/search-toolbar.html",retrict:"E",controller:"SearchToolbarController as searchToolbar"};return t}angular.module("otus.participant.search").directive("otusSearchToolbar",t)}();