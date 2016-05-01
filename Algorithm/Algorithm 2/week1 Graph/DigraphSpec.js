var expect = require('chai').expect;
var Digraph = require('./Digraph.js').Digraph;
var DirectedDFS = require('./Digraph.js').DirectedDFS;
var DirectedBFS = require('./Digraph.js').DirectedBFS;
var Topology = require('./Digraph.js').Topology;
var SCC = require('./Digraph.js').SCC;

//use eql() instead of equal()
describe('Directed Graph', function(){
	var diGraph = new Digraph(13); 
	diGraph.addEdges(4,2);
	diGraph.addEdges(2,3);
	diGraph.addEdges(3,2);
	diGraph.addEdges(6,0);
	diGraph.addEdges(0,1);
	diGraph.addEdges(2,0);
	diGraph.addEdges(11,12);
	diGraph.addEdges(12,9);
	diGraph.addEdges(9,10);
	diGraph.addEdges(9,11);
	diGraph.addEdges(8,9);
	diGraph.addEdges(10,12);
	diGraph.addEdges(11,4);
	diGraph.addEdges(4,3);
	diGraph.addEdges(3,5);
	diGraph.addEdges(6,8);
	diGraph.addEdges(8,6);
	diGraph.addEdges(5,4);
	diGraph.addEdges(0,5);
	diGraph.addEdges(6,4);
	diGraph.addEdges(6,9);
	diGraph.addEdges(7,6);
	it('Directed Graph Implement By DFS Has Path To', function(){
		var directedDFS = new DirectedDFS(diGraph,0);
		expect(directedDFS.reachablility()).to.eql([0,1,2,3,4,5]);

	});
	it('Directed Graph Implement By BFS in Multi-Source Has Path To', function(){
		var directedBFS = new DirectedBFS(diGraph,[1,7,10]);
		expect(directedBFS.multiSourceShortestPath(5)).to.eql([5,0,6,7]);
	});
	var diGraph2 = new Digraph(7); 
	diGraph2.addEdges(0,5);
	diGraph2.addEdges(0,2);
	diGraph2.addEdges(0,1);
	diGraph2.addEdges(3,6);
	diGraph2.addEdges(3,5);
	diGraph2.addEdges(3,4);
	diGraph2.addEdges(5,2);
	diGraph2.addEdges(6,4);
	diGraph2.addEdges(6,0);
	diGraph2.addEdges(3,2);
	diGraph2.addEdges(1,4);
	it('Topology sort', function(){
		var topology = new Topology(diGraph2);
		expect(topology.topologySort).to.eql([ 2, 5, 4, 1, 0, 6, 3 ]);
	});
	it('Strong Connected Component', function(){
		var scc = new SCC(diGraph);
		expect(scc.connected(0,5)).to.equal(true);
	});
});