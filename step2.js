(function(global, factory) {

	"use strict";

	if(typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			factory(global, true) :
			function(w) {
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else {
		factory(global);
	}

})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	
	"use strict";

	var jQuery = function() {
		return new jQuery.fn.init();
	};

	var init = jQuery.fn.init = function() {};

	init.prototype = jQuery.fn;

	if(typeof define === "function" && define.amd) {
		define("jquery", [], function() {
			return jQuery;
		});
	}

	var _jQuery = window.jQuery,

	_$ = window.$;
	
	jQuery.noConflict = function(deep) {
		if(window.$ === jQuery) {
			window.$ = _$;
		}

		if(deep && window.jQuery === jQuery) {
		window.jQuery = _jQuery;
		}

		return jQuery;
	};

	if(!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}
	
	return jQuery;
});
