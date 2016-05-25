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
}

var AcyclicSP = function(edgeWeightedDigraph, s){
	this.edgeTo = [];
	this.graph = edgeWeightedDigraph;
	this.distTo = [];
	function init(){
		for(var i=0; i<this.graph.size; i++){
			this.distTo.push(Number.MAX_VALUE);
		}
		this.distTo[s] = 0;
	}
	init.bind(this)();

	this.topologySort = topologySort(this.graph);
	for(var i in this.topologySort){
		for(var j in this.graph.adj[this.topologySort[i]]){
			var e = this.graph.adj[this.topologySort[i]][j];
			relax2.bind(this)(e);
		}
	}
}

var BFSP = function(edgeWeightedDigraph, s){
	this.edgeTo = [];
	this.distTo = [];
	this.graph = edgeWeightedDigraph;
	this.queue = [];

	function init(){
		for(var i=0; i<this.graph.size; i++){
			this.distTo.push(Number.MAX_VALUE);
			this.queue.push(i);
		}
		this.distTo[s] = 0;
	}
	init.bind(this)();
	this.queue.push(s);
	while(this.queue.length>0){
		var i = this.queue.shift();
		for(var j in this.graph.adj[i]){
			var e = this.graph.adj[i][j];
			relax3.bind(this)(e);
		}
	}
}

function topologySort(DAG){
	var arr = [];
	var stack = [];
	var isMark = [];
	for(var i=0; i<DAG.size; i++){
		isMark.push(false);
	}
	for (var i = 0; i < DAG.size; i++) {
		if(!isMark[i]){
			dfs(isMark, DAG, i, arr);
		}
	};
	return arr;
}

function dfs(isMark, DAG, i, arr){
	isMark[i] = true;
	for(e in DAG.adj[i]){
		if(!isMark[DAG.adj[i][e].to()]){
			dfs(isMark,DAG,DAG.adj[i][e].to(),arr);
		}
	}
	arr.unshift(i);
}

// for Dijkstra
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

//For Acyclic
function relax2(e){
	var v = e.from();
	var w = e.to();
	if(this.distTo[w] > this.distTo[v]+e.weight){
		this.distTo[w] = this.distTo[v]+e.weight;
		this.edgeTo[w] = e;
	}
}

//For Bellman-Ford
function relax3(e){
	var v = e.from();
	var w = e.to();
	if(this.distTo[w] > this.distTo[v]+e.weight){
		this.distTo[w] = this.distTo[v]+e.weight;
		this.edgeTo[w] = e;
		if(this.queue.indexOf(w)<0){
			this.queue.push(w);
			console.log(this.queue);
		}
	}
}

module.exports = {
	DirectedEdge : DirectedEdge,
	EdgeWeightedDigraph : EdgeWeightedDigraph,
	DijkstraSP : DijkstraSP,
	AcyclicSP : AcyclicSP,
	BFSP : BFSP
}