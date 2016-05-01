var MinPQ = require('./MinPQ.js');
var QU = require('./QU.js')

var Edge = function(v,w,weight){
	this.v = v;
	this.w = w;
	this.weight = weight;
}

Edge.prototype = {
	other : function(v){
		if(v===this.v){
			return this.w
		}
		return this.v;
	},
	either : function(){
		return this.v;
	},
	valueOf : function(){
		return this.weight;
	}
}

var EdgeWeightGraph = function(size){
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
EdgeWeightGraph.prototype = {
	addEdge : function(e){
		var v = e.either();
		var w = e.other(v);
		this.adj[v].push(w);
		this.adj[w].push(v);
		this.edges.push(e);
	},
	adj : function(v){
		return this.adj[v];
	}
}

var KruskalMST = function(graph){
	this.mst = [];
	this.graph = graph;
	this.minPQ = new MinPQ(graph.edges.length);
	this.qu = new QU(graph.size);
	this.weightSum = 0;
	function init(){
		for(var i = 0; i < graph.edges.length ; i++){
			this.minPQ.insert(graph.edges[i]);
		}
		while(this.mst.length<this.graph.size-1){
			s = this.minPQ.deleteMin();
			v = s.either();
			w = s.other(v);
			if(!this.qu.connected(v,w)){
				this.qu.union(v,w);
				this.mst.push(s);
				this.weightSum += s.weight;
			}
		}
	}
	init.bind(this)();
}

module.exports = {
	Edge : Edge,
	EdgeWeightGraph : EdgeWeightGraph,
	KruskalMST : KruskalMST
}


