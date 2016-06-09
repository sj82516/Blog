"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//source : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions

//Class :
// 1. kind of function
// 2. No hoisting ! Should declare before utilize
// 3. Static Method is for

var Polygon = function () {
	function Polygon(height, weight) {
		_classCallCheck(this, Polygon);

		this.weight = weight;
		this.height = height;
	}

	// Prototype Function


	_createClass(Polygon, [{
		key: "calc",
		value: function calc() {
			return this.weight * this.height;
		}
	}, {
		key: "color",


		//Getter and Setter : Set Property
		set: function set(color) {
			this._color = color;
		},
		get: function get() {
			return this._color;
		}
	}], [{
		key: "method",
		value: function method() {
			return "Hello worold";
		}
	}]);

	return Polygon;
}();

var polygon = new Polygon(4, 5);
console.log(polygon.calc());
console.log(polygon.color = 'red');
console.log(polygon.color);
console.log(Polygon.method());

var SonPolygon = function (_Polygon) {
	_inherits(SonPolygon, _Polygon);

	function SonPolygon(height, weight) {
		_classCallCheck(this, SonPolygon);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(SonPolygon).call(this, height, weight));
	}

	return SonPolygon;
}(Polygon);

var sonPolygon = new SonPolygon(3, 4);

// Static method would not be inherited !
// console.log(polygon.mCalc()); => is not a function
console.log(sonPolygon.calc());
console.log(SonPolygon.method());