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

	var getProto = Object.getPrototypeOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call( Object );

	var jQuery = function() {
		return new jQuery.fn.init();
	};

	jQuery.fn = jQuery.prototype;

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		if(typeof target === "boolean") {
			deep = target;
	
			target = arguments[i] || {};
			i++;
		}
	
		if(typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}
	
		if(i === length) {
			target = this;
			i--;
		}
	
		for(; i < length; i++) {
			if((options = arguments[i]) != null) {
				for(name in options) {
					src = target[name];
					copy = options[name];
	
					if(target === copy) {
						continue;
					}
	
					if(deep && copy && (jQuery.isPlainObject(copy) ||
						(copyIsArray = Array.isArray(copy)))) {
	
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
	
						target[name] = jQuery.extend(deep, clone, copy);
	
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
	
		return target;
	};

	jQuery.extend({
		isFunction: function(obj) {
			return jQuery.type(obj) === "function";
		},

		isWindow: function(obj) {
			return obj != null && obj === obj.window;
		},

		isPlainObject: function(obj) {
			var proto, Ctor;
	
			if(!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}
	
			proto = getProto(obj);
	
			if (!proto) {
				return true;
			}
	
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		type: function(obj) {
			if (obj == null) {
				return obj + "";
			}

			return typeof obj === "object" || typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		},

		each: function(obj, callback) {
			var length, i = 0;
	
			if (isArrayLike(obj)) {
				length = obj.length;
				for(; i < length; i++) {
					if (callback.call(obj[i], i, obj[i] ) === false) {
						break;
					}
				}
			} else {
				for(i in obj) {
					if(callback.call(obj[i], i, obj[i] ) === false) {
						break;
					}
				}
			}
	
			return obj;
		}
	});

	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArrayLike(obj) {
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type(obj);
	
		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	}

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
