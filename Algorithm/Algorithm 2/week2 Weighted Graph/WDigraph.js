var IndexMinPQ = require('./IndexMinPQ.js');

var DirectedEdge = function(v, w, weight){
	this.v = v;
	this.w = w;
	this.weight = weight;
}

DirectedEdge.prototype = {
	from : function(){
		return this.v;
	},
	to : function(){
		return this.w;
	},
	valueOf : function(){
		return this.weight;
	}
}

var EdgeWeightedDigraph = function(size){
	this.size = size;
	this.adj = [];
	this.edges = [];
	function init(){
		for(var i = 0; i < size ; i++){
			this.adj.push([]);
		}
	};
	init.bind(this)();
}

EdgeWeightedDigraph.prototype = {
	addEdges : function(e){
		var v = e.from();
		this.adj[v].push(e);
		this.edges.push(e);
	}
}

var DijkstraSP = function(edgeWeightedDigraph, s){
	this.edgeTo = [];
	this.distTo = [];
	this.graph = edgeWeightedDigraph;
	this.pq = new IndexMinPQ(this.graph.size);

	function init(){
		for(var i=0; i<this.graph.size; i++){
			this.distTo.push(Number.MAX_VALUE);
		}
		this.distTo[s] = 0;
	}
	init.bind(this)();

	this.pq.insert(s, 0);
	while(!this.pq.isEmpty()){
		var v = this.pq.deleteMin();
		for(e in this.graph.adj[v]){
			relax.bind(this)(this.graph.adj[v][e]);
		}
	}

	function relax(e){
		var v = e.from();
		var w = e.to();
		if(this.distTo[w] > this.distTo[v]+e.weight){
			this.distTo[w] = this.distTo[v]+e.weight;
			this.edgeTo[w] = e;
			if(this.pq.contains(w)){
				this.pq.decreaseKey(w, this.distTo[w]);
			}else{
				this.pq.insert(w, this.distTo[w]);
			}
		}
	}
}

module.exports = {
	DirectedEdge : DirectedEdge,
	EdgeWeightedDigraph : EdgeWeightedDigraph,
	DijkstraSP : DijkstraSP
}