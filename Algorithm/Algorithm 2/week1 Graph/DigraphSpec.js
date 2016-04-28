var expect = require('chai').expect;
var Graph = require('./Graph.js').Graph;
var Path = require('./Graph.js').Path;
var CC = require('./Graph.js').CC;

//use eql() instead of equal()
describe('Undirected Graph Implement By DFS', function(){
	var graph = new Graph(13); 
	graph.addEdges(0,5);
	graph.addEdges(4,3);
	graph.addEdges(0,1);
	graph.addEdges(9,12);
	graph.addEdges(6,4);
	graph.addEdges(5,4);
	graph.addEdges(0,2);
	graph.addEdges(11,12);
	graph.addEdges(9,10);
	graph.addEdges(0,6);
	graph.addEdges(7,8);
	graph.addEdges(9,11);
	graph.addEdges(5,3);
	it('Undirected Graph Implement By DFS Has Path To', function(){
		var path = new Path(graph,0,true);
		expect(path.hasPathTo(2)).to.be.equal(true);
	});
	it('Undirected Graph Implement By BFS Path To', function(){
		var path = new Path(graph,0,false);
		expect(path.edgeTo).to.be.eql([0,0,0,5,5,0,0,null,null,null,null,null,null]);
	});

	it('Undirected Graph Implement Connected Component', function(){
		var cc = new CC(graph);
		expect(cc.count).to.be.equal(3);
	});
})