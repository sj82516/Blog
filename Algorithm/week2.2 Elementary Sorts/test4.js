var expect = require('chai').expect;
var Sort = require('./Sort.js');

//use eql() instead of equal()
describe('Sort', function(){
	it('selection sort', function(){
		var sort = new Sort([3,5,1,6,8,4]);
		expect(sort.selectionSort()).to.eql([1,3,4,5,6,8]);
	});
	it('insertion sort', function(){
		var sort = new Sort([3,5,1,6,8,4]);
		expect(sort.insertionSort()).to.eql([1,3,4,5,6,8]);
	});
	it('shell sort', function(){
		var sort = new Sort([3,5,1,6,8,4]);
		expect(sort.shellSort()).to.eql([1,3,4,5,6,8]);
	});
})