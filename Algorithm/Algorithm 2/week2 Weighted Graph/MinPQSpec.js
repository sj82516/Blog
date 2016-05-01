var expect = require('chai').expect;
var MinPQ = require('./MinPQ.js');

describe("Minimun Priority Queue Implement", function(){
	var minPQ = new MinPQ(10);
	minPQ.insert('N');
	minPQ.insert('E');
	minPQ.insert('I');
	minPQ.insert('P');
	minPQ.insert('H');
	minPQ.insert('T');
	minPQ.insert('A');
	minPQ.insert('O');
	minPQ.insert('R');
	console.log(minPQ.output());
	it('Undirected Graph Implement By DFS Has Path To', function(){
	expect(minPQ.output()).to.eql([ 'A', 'H', 'E', 'O', 'N', 'T', 'I', 'P' ]);
	minPQ.deleteMin();
})