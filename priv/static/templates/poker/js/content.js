(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();
require.register("js/content/components/app.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _layout = require("./layout.vue");

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
   props: ["payload"],
   data: function data() {
      return {
         selected: _layout2.default
      };
   },
   methods: {},
   computed: {},
   created: function created() {
      console.log("content-app created");
   }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c(_vm.selected,{tag:"component"})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-83776034", __vue__options__)
  } else {
    hotAPI.reload("data-v-83776034", __vue__options__)
  }
})()}
});

;require.register("js/content/components/layout.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
			value: true
});


var shell = require('js/shell/shell.js');

exports.default = {
			props: ["payload"],

			data: function data() {
						return {

									active: "home",

									categories: [{ text: "home", id: "home" }, { text: "moments", id: "moments" }, { text: "login", id: "login" }],

									navigation: false,
									modal_origin: "",
									modal: false,
									content: "home"

						};
			},

			methods: {

						getContent: function getContent(item) {
									console.log("Get content", item);
									this.active = item.id;
									this.content = item.id;
						},

						switchNavigation: function switchNavigation(flag) {
									this.navigation = !this.navigation;
						},
						showContent: function showContent(content) {
									this.content = content.id;
						},
						showModal: function showModal(ctx) {
									this.modal = true;
									this.modal_origin = ctx.origin;
						},
						closeModal: function closeModal() {
									this.modal = false;
									shell.network.getBus().$emit("normalize" + this.modal_origin);
						}
			},

			computed: {},

			created: function created() {
						shell.network.getBus().$on('showContent', this.showContent);
						shell.network.getBus().$on('showModal', this.showModal);
						shell.network.getBus().$on('switchNavigation', this.switchNavigation);
			}
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"content_container"},[_c('div',{class:{"navigation_on": _vm.navigation, "navigation_off": !_vm.navigation}},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},_vm._l((_vm.categories),function(item){return _c('nav',{staticClass:"navel",on:{"click":function($event){$event.preventDefault();}}},[_c('a',{class:{ active_link: _vm.active === item.id},attrs:{"href":"#"},on:{"click":function($event){_vm.getContent(item)}}},[_vm._v(_vm._s(item.text))])])}),0)])]),_vm._v(" "),_c('div',[_c('home',{class:{"home_on": _vm.content === "home", "home_off": _vm.content !== "home"}}),_vm._v(" "),_c('moments',{class:{"moments_on": _vm.content === "moments", "moments_off": _vm.content !== "moments"}})],1),_vm._v(" "),_c('div',{class:{'modal_on': _vm.modal, 'modal_off': !_vm.modal}},[_c('button',{on:{"click":_vm.closeModal}},[_vm._v("Close modal")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7238b1f5", __vue__options__)
  } else {
    hotAPI.reload("data-v-7238b1f5", __vue__options__)
  }
})()}
});

;require.register("js/content/main.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.init = undefined;

var _app = require('./components/app.vue');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('content-app', _app2.default);

var init = function init(payload) {
				var content = new Vue({
								//router: payload.router,
								template: "<content-app :payload='payload'></content-app>",
								data: {
												payload: payload
								},

								created: function created() {
												console.log("content-main invoked");
								}
				});
				return { view: content };
};

exports.init = init;
});

;
//# sourceMappingURL=content.js.map