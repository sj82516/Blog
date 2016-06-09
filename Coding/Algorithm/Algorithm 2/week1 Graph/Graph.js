/**
 * Build up undirected graph
 * @param {[int]} size - number of vertices 
 */
var Graph = function(size){
	this.size = size;
	this.adj = [];
	for(var i=0;i<size;i++){
		this.adj.push([]);
	}
}

Graph.prototype.addEdges = function(v,w){
	this.adj[v].push(w);
	this.adj[w].push(v);
}

Graph.prototype.adj = function(v){
	return this.adj[v];
}

/**
 * Find path from s to other reachable vertices in the graph
 * @param {Graph} graph - 
 * @param {Int} s - start point
 * @param {Boolean} opt - true for DFS : false for BFS
 */
var Path = function(graph,s,opt){
	this.graph = graph;
	this.mark = [];
	this.edgeTo = [];
	function init(){
		for(var i=0;i<graph.size;i++){
			this.mark.push(false);
			this.edgeTo.push(null);
		}
		if(opt){
			this.dfs(s);
		}else{
			this.bfs(s);
		}
	};
	init.bind(this)();
}

/**
 * @param  {int} v - specific vertex
 * @return {Boolean} - Is there any path from start point to v or not ?  
 */
Path.prototype.hasPathTo = function(v){
	if(this.mark[v]){
		return true;
	}
	return false;
}

Path.prototype.pathToByDFS = function(v){
	var path = [];
	var from = v;
	if(!this.mark[v]){
		return null;
	}
	while(true){
		path.push(v);
		if(from===this.s){
			return;
		}
		from = this.edgeTo[v];
	}
}

Path.prototype.dfs = function(v){
	this.mark[v]=true;
	var next = 0;
	for(var i=0;i<this.graph.adj[v].length;i++){
		next = this.graph.adj[v][i];
		if(!this.mark[next]){
			this.dfs(next);
			this.edgeTo[next] = v;
		}
	}
}

Path.prototype.bfs = function(v){
	var curr = 0,
		next = 0,
		queue = [];
	queue.push(v);
	this.mark[v] = true;
	this.edgeTo[v] = v;
	while(queue){
		curr = queue.shift();
		if(curr===undefined){
			return;
		}
		for(var i=0; i< this.graph.adj[curr].length; i++){
			next = this.graph.adj[curr][i];
			if(!this.mark[next]){
				queue.push(next);
				this.edgeTo[next] = curr;
				this.mark[next] = true;
			}
		}
	}
}
/**
 * Connected Component
 * @param {Graph}
 */
var CC = function(graph){
	this.graph = graph;
	this.mark = [];
	this.id = [];
	this.count = 0;
	function init(){
		for(var i=0;i<this.graph.size;i++){
			this.mark.push(false);
			this.id.push(0);
		}
		for(var j=0;j<this.graph.size;j++){
			if(!this.mark[j]){
				this.dfsCC(j);
				this.count++;
			}
		}
	}
	init.bind(this)();
}

CC.prototype.dfsCC = function(v){
	if(v===null){
		return;
	}
	this.mark[v] = true;
	this.id[v] = this.count;
	var next = 0;
	next = this.graph.adj[v];
	for(var i=0;i<next.length;i++){
		if(!this.mark[next[i]]){
			v = next[i];
			this.dfsCC(v);
		}
	}
}

CC.prototype.connected = function(v,w){
	if(this.id[v]===this.id[w]){
		return true;
	}
	return false;
}

CC.prototype.count = function(){
	return this.count;
}

CC.prototype.id = function(v){
	return this.id[v];
}

module.exports = {
	Graph : Graph,
	Path : Path,
	CC : CC
};