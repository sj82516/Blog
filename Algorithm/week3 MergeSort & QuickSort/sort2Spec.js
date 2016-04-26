var expect = require('chai').expect;
var Sort2 = require('./Sort2.js');

//use eql() instead of equal()
describe('Sort2', function(){
	it('merge sort', function(){
		var sort2 = new Sort2([3,5,1,6,8,4]);
		sort2.mergeSort();
		expect(sort2.list).to.eql([1,3,4,5,6,8]);
	});
	it('quick sort', function(){
		var sort2 = new Sort2([3,5,1,6,8,4]);
		sort2.quickSort();
		expect(sort2.list).to.eql([1,3,4,5,6,8]);
	});
})