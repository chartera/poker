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
require.register("js/home/components/app.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _layout = require('./layout.vue');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('home', _layout2.default);
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
      console.log("home-app created");
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
    hotAPI.createRecord("data-v-4b77db20", __vue__options__)
  } else {
    hotAPI.reload("data-v-4b77db20", __vue__options__)
  }
})()}
});

;require.register("js/home/components/layout.vue", function(exports, require, module) {
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
												visible: true,
												y: "",
												sortedItems: [{ email: "test1" }, { email: "test1" }]
								};
				},

				methods: {
								normalizeContent: function normalizeContent() {
												var _this = this;

												console.log("normalizeContent");
												this.visible = !this.visible;
												if (this.visible) {
																setTimeout(function () {
																				console.log("Do scroll", _this.y);
																				window.scrollTo(0, _this.y);
																}, 10);
												}
								},
								getInfo: function getInfo(item) {
												console.log("getInfo", item);
												this.y = window.scrollY;
												this.normalizeContent();
												shell.network.getBus().$emit('showModal', { origin: "Home" });
								}
				},

				computed: {},

				created: function created() {
								shell.network.getBus().$on('normalizeHome', this.normalizeContent);
				}
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'visible': _vm.visible, 'no_visible': !_vm.visible}},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"twelve columns"},_vm._l((_vm.sortedItems),function(item){return _c('div',{staticClass:"three column"},[_c('div',{staticStyle:{"text-align":"center"}},[_c('img',{staticStyle:{"height":"9em","width":"80%"},attrs:{"src":"/templates/www/img/default-user.png"},on:{"click":function($event){_vm.getInfo(item)}}})])])}),0)])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-336fa47b", __vue__options__)
  } else {
    hotAPI.reload("data-v-336fa47b", __vue__options__)
  }
})()}
});

;require.register("js/home/main.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.init = undefined;

var _app = require('./components/app.vue');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('home-app', _app2.default);

var init = function init(payload) {
				var content = new Vue({
								//router: payload.router,
								template: "<home-app :payload='payload'></home-app>",
								data: {
												payload: payload
								},
								created: function created() {
												console.log("home-main invoked");
								}
				});
				return { view: content };
};

exports.init = init;
});

;
//# sourceMappingURL=home.js.map