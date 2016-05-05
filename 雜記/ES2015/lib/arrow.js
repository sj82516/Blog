'use strict';

//source : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions

/*
Shorter function
 */
var a = ['Hello1', 'Hello2', 'Hello3'];

var a2 = a.map(function (s) {
	return s.length;
});
var a3 = a.map(function (s) {
	return s.length;
});

/*
Invoked through call or apply
"this" is already bound lexically
 */
var adder = {
	base: 1,

	add: function add(a) {
		var _this = this;

		var f = function f(v) {
			return v + _this.base;
		};
		return f(a);
	},

	addThruCall: function addThruCall(a) {
		var f = function f(v) {
			return v + this.base;
		};
		var b = {
			base: 2
		};

		return f.call(b, a);
	},

	addThruCall2: function addThruCall2(a) {
		var _this2 = this;

		var f = function f(v) {
			return v + _this2.base;
		};
		var b = {
			base: 2
		};

		return f.call(b, a);
	}
};

console.log(adder.add(1)); //2
console.log(adder.addThruCall(1)); //3 !
console.log(adder.addThruCall2(1)); //2