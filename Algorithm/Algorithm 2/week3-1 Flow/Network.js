var Flow = function(v, w, capacity){
	this.v = v;
	this.w = w;
	this.capacity = capacity;
	this.flow = 0;

}

Flow.prototype = {
	from : function(){
		return this.v;
	},
	to : function(){
		return this.w;
	},
	capacity : function(){
		return this.capacity;
	},
	flow : function(){
		return this.flow;
	},
	other : function(vertex){
		if(vertex === this.v){
			return this.w;
		}else if(vertex === this.w){
			return this.v;
		}
	},
	residualCapacity : function(vertex){
		//backward edge
		if(vertex === this.v){
			return this.flow;
		}//forward edge
		else if(vertex === this.w){
			return this.capacity - this.flow;
		}
	},
	addResidualFlowTo : function(vertex, delta){
		if(vertex === this.v){
			return this.flow-=delta;
		}else if(vertex === this.w){
			return this.flow+=delta;
		}
	}
}

var FlowNetwork = function(size){
	this.size = size;
	this.adj = [];

	function init(){
		for(var i=0; i<this.size; i++){
			this.adj.push([]);
		}
	}
	init.bind(this)();
}

FlowNetwork.prototype = {
	addEdge : function(flow){
		var v = flow.from();
		var w = flow.to();
		this.adj[v].push(flow);
		this.adj[w].push(flow);
	}
}

var FordFulkerson = function(flowNetwork, s, t){
	this.network = flowNetwork;
	this.marked = [];
	this.edgeTo = [];
	this.value = 0;

	function init(){
		while(this.hasAugmentingPath(s,t)){
			var bottle = Number.MAX_VALUE;
			for(var v = t; v!==s; v = this.edgeTo[v].other(v)){
				bottle = Math.min(bottle, this.edgeTo[v].residualCapacity(v));
			}
			for(var v = t; v!==s; v = this.edgeTo[v].other(v)){
				this.edgeTo[v].addResidualFlowTo(v,bottle);
			}
			this.value += bottle;
		}
	}
	init.bind(this)();
}

FordFulkerson.prototype = {
	hasAugmentingPath : function(s,t){
		this.marked = [];
		this.edgeTo = [];
		var queue = [];
		var curr = 0;
		queue.push(s);
		for(var i=0; i<this.network.size; i++){
			this.marked.push(false);
			this.edgeTo.push(0);
		}
		while(queue.length>0){
			curr = queue.shift();
			this.marked[curr] = true;
			for(var i=0; i<this.network.adj[curr].length; i++){
				var e = this.network.adj[curr][i];
				if(!this.marked[e.other(curr)] && e.residualCapacity(e.other(curr)) > 0){
					queue.push(e.other(curr));
					this.edgeTo[e.other(curr)] = e;
				}
			}
		}
		return this.marked[t];
	},
	inCut : function(v){
		return this.marked[v];
	}
}


module.exports = {
	Flow : Flow,
	FlowNetwork : FlowNetwork,
	FordFulkerson : FordFulkerson
}