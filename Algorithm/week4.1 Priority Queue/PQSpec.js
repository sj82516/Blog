var expect = require('chai').expect;
var PQ = require('./PQ.js');

//use eql() instead of equal()
describe('Priority Queue use Complete Binary Tree', function(){
	var pq = new PQ(10);
	pq.insert(5);
	pq.insert(2);
	pq.insert(8);
	pq.insert(10);
	it('PQ insert', function(){
		expect(pq.arr).to.eql([0,10,8,5,2]);
		expect(pq.curr).to.eql(4);
	});
	it('PQ deleteMax', function(){
		expect(pq.deleteMax()).to.eql(10);
		expect(pq.curr).to.eql(3);
	});
})