var expect = require('chai').expect;
var DirectedEdge = require('./WDiGraph.js').DirectedEdge;
var EdgeWeightedDigraph = require('./WDiGraph.js').EdgeWeightedDigraph;
var DijkstraSP = require('./WDiGraph.js').DijkstraSP;
var AcyclicSP = require('./WDiGraph.js').AcyclicSP;
var BFSP = require('./WDiGraph.js').BFSP;

describe("Weighted Undirected Graph", function () {
	var edgeWeightDiGraph = new EdgeWeightedDigraph(8);
	edgeWeightDiGraph.addEdges(new DirectedEdge(0,1,5));
	edgeWeightDiGraph.addEdges(new DirectedEdge(0,4,9));
	edgeWeightDiGraph.addEdges(new DirectedEdge(0,7,8));
	edgeWeightDiGraph.addEdges(new DirectedEdge(1,2,12));
	edgeWeightDiGraph.addEdges(new DirectedEdge(1,3,15));
	edgeWeightDiGraph.addEdges(new DirectedEdge(1,7,4));
	edgeWeightDiGraph.addEdges(new DirectedEdge(2,3,3));
	edgeWeightDiGraph.addEdges(new DirectedEdge(2,6,11));
	edgeWeightDiGraph.addEdges(new DirectedEdge(3,6,9));
	edgeWeightDiGraph.addEdges(new DirectedEdge(4,5,4));
	edgeWeightDiGraph.addEdges(new DirectedEdge(4,6,20));
	edgeWeightDiGraph.addEdges(new DirectedEdge(4,7,5));
	edgeWeightDiGraph.addEdges(new DirectedEdge(5,2,1));
	edgeWeightDiGraph.addEdges(new DirectedEdge(5,6,13));
	edgeWeightDiGraph.addEdges(new DirectedEdge(7,5,6));
	edgeWeightDiGraph.addEdges(new DirectedEdge(7,2,7));
	var dijkstraSP = new DijkstraSP(edgeWeightDiGraph, 0);
	var acyclicSP = new AcyclicSP(edgeWeightDiGraph, 0);
	var bFSP = new BFSP(edgeWeightDiGraph, 0);

	console.log(dijkstraSP.edgeTo);
	console.log(bFSP.edgeTo);
	console.log(dijkstraSP.distTo);
	console.log(bFSP.distTo);
})