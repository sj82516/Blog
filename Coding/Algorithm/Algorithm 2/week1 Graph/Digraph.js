/**
 * @param {size} - number of Directed graph vertices
 */
var Digraph = function(size){
	this.size = size;
	this.adj = [];
	function init(){
		for (var i = 0; i < this.size; i++) {
			this.adj.push([]);
		};
	}
	init.bind(this)();
}

Digraph.prototype.addEdges = function(v,w){
	this.adj[v].push(w);
}

Digraph.prototype.adj = function(v){
	return this.adj[v];
}

/**
 * Digraph implement by DFS
 * @param {Digraph}
 * @param {Int} - start point
 */
var DirectedDFS = function(graph,s){
	this.graph = graph;
	this.mark = [];
	this.edgeTo = [];
	function init(){
		for (var i = 0; i < this.graph.size; i++) {
			this.mark.push(false);
			this.edgeTo.push(null);
		}
		this.dfs(s);
	}
	init.bind(this)();
}

DirectedDFS.prototype.dfs = function(v){
	var next = 0;
	this.mark[v] = true;
	for(var i = 0; i < this.graph.adj[v].length ; i++){
		next = this.graph.adj[v][i];
		if(!this.mark[next]){
			this.edgeTo[next] = v;
			this.dfs(next);
		}
	}
}

/**
 * @return {array} - show all vertices that start vertex can reach
 */
DirectedDFS.prototype.reachablility = function(){
	var reachablility = [];
	for(var i=0; i < this.mark.length; i++){
		if(this.mark[i]){
			reachablility.push(i);
		}
	}
	return reachablility;
}

/**
 * Digraph implemented by BFS , can accept multi-sources
 * @param {[type]}
 * @param {[type]}
 */
var DirectedBFS = function(graph,args){
	this.graph = graph;
	this.mark = [];
	this.edgeTo = [];
	this.args = args;
	this.argsNum = args.length;
	//distance
	this.distTo = [];
	function init(){
		for (var i = 0; i < this.graph.size; i++) {
			this.mark.push([]);
			this.edgeTo.push([]);
			this.distTo.push([]);
			for(var j = 0; j < this.argsNum; j++){
				this.mark[i].push(false);
				this.edgeTo[i].push(null);
				this.distTo[i].push(null);
			}
		};
		for(var k = 0; k < this.argsNum; k++){
			this.bfs(args[k],k);	
		}
	}
	init.bind(this)();
}

DirectedBFS.prototype.bfs = function(v,k){
	var queue = [],
		dist = 0,
		curr = 0,
		next = 0;
	this.edgeTo[v][k] = v;
	this.distTo[v][k] = 0;
	this.mark[v][k] = true;
	queue.push(v);
	while(queue){
		curr = queue.shift();
		if(curr===undefined){
			return;
		}
		for(var i = 0; i < this.graph.adj[curr].length; i++){
			next = this.graph.adj[curr][i];
			if(!this.mark[next][k]){
				queue.push(next);
				this.edgeTo[next][k] = curr;
				this.distTo[next][k] = this.distTo[curr][k]+1;
				this.mark[next][k] = true;
			}
		}
	}
}

//show in reverse order
DirectedBFS.prototype.multiSourceShortestPath = function(v){
	var path = [],
		minDist = Number.MAX_VALUE,
		minArgsIndex = 0;
	for(var i = 0; i < this.argsNum; i++){
		if(this.distTo[v][i]===null){
			continue;
		}
		if(minDist > this.distTo[v][i]){
			minDist = this.distTo[v][i];
			minArgsIndex = i;
		}
	}
	while(v!==this.args[minArgsIndex]){
		path.push(v);
		v = this.edgeTo[v][minArgsIndex]; 
	}
	path.push(this.args[minArgsIndex]);
	return path;
}

var Topology = function(graph){
	this.graph = graph;
	this.size = graph.size;
	this.topologySort = [];
	this.mark = [];
	function init(){
		for (var i = 0; i < this.graph.size; i++) {
			this.mark.push(false);
		};
		for (var i = 0; i < this.graph.size; i++) {
			if(!this.mark[i]){
				this.dfs(i);
			}
		};
	}
	init.bind(this)();
}

Topology.prototype.dfs = function(v){
	this.mark[v] = true;
	var next = 0;
	for(var i=0; i < this.graph.adj[v].length; i++){
		next = this.graph.adj[v][i];
		if(!this.mark[next]){
			this.dfs(next);
		}
	}
	this.topologySort.push(v);
}

var SCC = function(graph){
	this.graph = graph;
	this.mark = [];
	this.low = [];
	this.stack = [];
	this.id = [];
	this.count = 0;
	this.preorder = 0;
	function init(){
		for (var i = 0; i < this.graph.size; i++) {
			this.mark.push(false);
			this.low.push(this.graph.size);
			this.id.push(0);
		};
		for (var j = 0; j < this.graph.size; j++) {
			if(!this.mark[j]){
				this.tarjanDFS(j);
			}
		};
	}
	init.bind(this)();
}

SCC.prototype.tarjanDFS = function(v){
	this.mark[v] = true;
	this.low[v] = this.preorder++;
	this.stack.push(v);
	var min = this.low[v];
	var next = 0;
	for(var i = 0; i < this.graph.adj[v].length; i++){
		next = this.graph.adj[v][i];
		if(!this.mark[next]){
			this.tarjanDFS(next);
		}
		//find the lowest position in all connected edges
		if(min > this.low[next]){
			min = this.low[next];
		}
	}
	// this mean there is some edge connected to lower position. -> cycle exist!
	if(min < this.low[v]){
		this.low[v] = min;
		return;
	}
	// min === this.low[v] -> cycle end
	do{
		next = this.stack.pop();
		this.id[next] = this.count;
		this.low[next] = this.graph.size;
		console.log(this.id);
	}while(next!==v)
	this.count++;
}

SCC.prototype.connected = function(v,w){
	return this.id[v] === this.id[w];
}

module.exports = {
	Digraph : Digraph,
	DirectedDFS : DirectedDFS,
	DirectedBFS : DirectedBFS,
	Topology : Topology,
	SCC : SCC
}