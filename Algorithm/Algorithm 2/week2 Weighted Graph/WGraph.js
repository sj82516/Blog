var MinPQ = require('./MinPQ.js');

var Edge = function(v,w,weight){
	this.v = v;
	this.w = w;
	this.weight = weight;
	this.prototype = {
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
}

var EdgeWeightGraph = function(size){
	this.size = size;
	this.adj = [];
	function init(){
		for(var i < 0; i < size ; i++){
			this.adj.push([]);
		}
	};
	init.bind(this)();
	this.prototype = {
		addEdge : function(e){
			var v = e.either();
			var w = e.other(v);
			this.adj[v].push(w);
			this.adj[w].push(v);
		}
		adj : function(v){
			return this.adj[v];
		}
	}
}




