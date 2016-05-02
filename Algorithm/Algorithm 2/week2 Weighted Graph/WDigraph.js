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