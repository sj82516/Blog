//source : https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes

//Class : 
// 1. kind of function
// 2. No hoisting ! Should declare before utilize
// 3. Static methods are often used to create utility functions for an application.
// 4. under strict mode 

class Polygon {
	constructor(height, weight) {
		this.weight = weight;
		this.height = height;
	}

	// Prototype Function
	calc(){
		return this.weight * this.height;
	}

	static method(){
		return "Hello worold";
	}

	//Getter and Setter : Set Property
	set color(color){
		this._color = color;
	}
	get color(){
		return this._color;
	}
}

let polygon = new Polygon(4,5);
console.log(polygon.calc());
console.log(polygon.color = 'red');
console.log(polygon.color);
console.log(Polygon.method());


class SonPolygon extends Polygon {
	constructor(height, weight){
		super(height, weight);
	}
}

let sonPolygon = new SonPolygon(3,4);

// Static method would not be inherited ! 
// console.log(polygon.mCalc()); => is not a function
console.log(sonPolygon.calc());
console.log(SonPolygon.method());


