var expect = require('chai').expect;
var IndexMinPQ = require('./IndexMinPQ.js');

describe("Index Minimun Priority Queue Implement", function(){
	var indexMinPQ = new IndexMinPQ(10);
	indexMinPQ.insert(1,5);
	indexMinPQ.insert(2,4);
	indexMinPQ.insert(3,8);
	indexMinPQ.insert(6,6);
	indexMinPQ.insert(4,3);
	indexMinPQ.insert(7,7);

	it('Index Minimun Priority Queue DecreaseKey', function(){
		indexMinPQ.decreaseKey(7,2);
		expect(indexMinPQ.pq).to.eql([0,7,2,4,6,1,3,0,0,0,0]);
		indexMinPQ.decreaseKey(1,1);
		expect(indexMinPQ.pq).to.eql([0,1,7,4,6,2,3,0,0,0,0]);
	});

	it('Index Minimun Priority Queue DecreaseKey', function(){
		expect(indexMinPQ.deleteMin()).to.equals(1);
		expect(indexMinPQ.deleteMin()).to.equals(7);
	})
})