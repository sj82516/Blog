var expect = require('chai').expect;
var Edge = require('./WGraph.js').Edge;
var EdgeWeightGraph = require('./WGraph.js').EdgeWeightGraph;
var KruskalMST = require('./WGraph.js').KruskalMST;
var PrimMST = require('./WGraph.js').PrimMST;

describe("Weighted Undirected Graph", function () {
	var edgeWeightGraph = new EdgeWeightGraph(8);
	edgeWeightGraph.addEdge(new Edge(2,7,0.34));
	edgeWeightGraph.addEdge(new Edge(2,3,0.17));
	edgeWeightGraph.addEdge(new Edge(4,5,0.35));
	edgeWeightGraph.addEdge(new Edge(4,7,0.37));
	edgeWeightGraph.addEdge(new Edge(0,4,0.38));
	edgeWeightGraph.addEdge(new Edge(1,2,0.36));
	edgeWeightGraph.addEdge(new Edge(3,6,0.52));
	edgeWeightGraph.addEdge(new Edge(6,4,0.93));
	edgeWeightGraph.addEdge(new Edge(0,7,0.16));
	edgeWeightGraph.addEdge(new Edge(1,3,0.29));
	edgeWeightGraph.addEdge(new Edge(1,7,0.19));
	edgeWeightGraph.addEdge(new Edge(6,2,0.40));
	edgeWeightGraph.addEdge(new Edge(6,0,0.58));
	edgeWeightGraph.addEdge(new Edge(0,2,0.26));
	edgeWeightGraph.addEdge(new Edge(1,5,0.32));
	edgeWeightGraph.addEdge(new Edge(5,7,0.28));
	it("KruskalMST",function(){
		var kruskalMST = new KruskalMST(edgeWeightGraph);
		console.log(kruskalMST.mst);
		expect(kruskalMST.mst).to.eql([ [ 0, 7 ],[ 2, 3 ],[ 1, 7 ],[ 0, 2 ],[ 5, 7 ],[ 4, 5 ],[ 6, 2 ] ]);
	});
	it("PrimMST",function(){
		var primMST = new PrimMST(edgeWeightGraph);
		console.log(primMST.mst);
		expect(primMST.mst).to.eql([[ 0, 7 ],[ 1, 7 ],[ 0, 2 ],[ 2, 3 ],[ 5, 7 ],[ 4, 5 ],[ 6, 2 ]]);
	});
})