var M = 0;

var DirectedDFS = function(g, matches){
  this.marked = [];
  for(let i=0; i<g.edges.length; i++){
    this.marked.push(false);
  }
  for(let i=0; i<matches.length; i++){
    if(!this.marked[matches[i]]){
      dfs(g, this.marked, matches[i]);
    }
  }
}
function dfs(g, marked, match){
  marked[match] = true;
  for(let i=0; i<g.edges[match].length; i++){
    if(!marked[g.edges[match][i]]){
      dfs(g, marked, g.edges[match][i]);
    }
  }
}

var DiGraph = function(nodeNum){
  this.edges = [];
  this.len = nodeNum;
  for(let i=0; i<this.len; i++){
    this.edges.push([]);
  }
}

DiGraph.prototype.addEdges = function(v,w){
  this.edges[v].push(w);
}

var NFA = function(regexp){
  this.g = new DiGraph(regexp.length+1);
  this.regexp = regexp;
  let lp=0,op=0;
  let opStack = [];
  let orStack = [];
  for(let i=0; i<regexp.length; i++){
    lp = i;
    if(regexp.charAt(i)=='(' || regexp.charAt(i)=='|'){
      opStack.push(i);
    }else if(regexp.charAt(i)==')'){
      op = opStack.pop();
      while(regexp.charAt(op)=='|'){
        orStack.push(op);
        op = opStack.pop();
      }
      lp = op;
      console.log(orStack,lp);
      while(op=orStack.pop()){
        this.g.addEdges(lp, op+1);
        this.g.addEdges(op, i);
      }
      orStack = [];
    }
    if(i<regexp.length-1 && regexp.charAt(i+1)=='*'){
      this.g.addEdges(i+1, lp);
      this.g.addEdges(lp, i+1);
    }
    if(regexp.charAt(i)=='(' || regexp.charAt(i)==')' || regexp.charAt(i)=='*'){
      this.g.addEdges(i, i+1);
    }
  }
}

NFA.prototype.recognize = function(s){
  let pc = [],match=[];
  let dfs = new DirectedDFS(this.g, [0]);
  for(let i=0; i<dfs.marked.length; i++){
    if(dfs.marked[i]){
      pc.push(i);
    }
  }
  for(let i=0; i<s.length; i++){
    match = [];
    for(let j=0; j<pc.length; j++){
      if(this.regexp.charAt(pc[j])==s.charAt(i) || this.regexp.charAt(pc[j])=='.'){
        match.push(pc[j]+1);
      }
    }
    pc = [];
    dfs = new DirectedDFS(this.g, match);
    for(let i=0; i<dfs.marked.length; i++){
      if(dfs.marked[i]){
        pc.push(i);
      }
    }
  }
  for(let i=0; i<pc.length; i++){
    if(pc[i]==this.regexp.length){
      return true;
    }
  }
  return false;
}

module.exports = NFA;
