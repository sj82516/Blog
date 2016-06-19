const R = 26;//Lowercase Alphabet

var Node = function(){
  this.next = [];
  this.v = null;
  for(let i=0; i<R; i++){
    this.next.push(null);
  }
}

var TrieST = function(){
  this.root = new Node();
}

TrieST.prototype = {
  get: function(s){
    let node = getTriesST(this.root, s, 0);
    if(node==null){
      return null;
    }else{
      return node.v;
    };
  },
  put: function(s, v){
    putTrieST(this.root, s, 0, v);
  },
  keys: function(){
    let arr = [];
    keysTrieST(this.root, '', arr);
    return arr;
  },
  keysWithPrefix: function(pre){
    let arr = [];
    keysTrieST(getTriesST(this.root , pre, 0), pre, arr);
    return arr;
  },
  delete: function(s){
    deleteTrieST(this.root , s, 0);
  }
}

var putTrieST = function(node, s, index, v){
  if(node.next[s.charCodeAt(index)-97]==null){
    node.next[s.charCodeAt(index)-97] = new Node();
  }
  if(s.length==index+1){
    node.next[s.charCodeAt(index)-97].v = v;
  }else{
    putTrieST(node.next[s.charCodeAt(index)-97], s, index+1, v);
  }
}

// return node
var getTriesST = function(node, s, index){
  if(node.next[s.charCodeAt(index)-97]==null){
    return null;
  }
  if(s.length==index+1){
      return node.next[s.charCodeAt(index)-97];
  }
  return getTriesST(node.next[s.charCodeAt(index)-97], s, index+1);
}

var keysTrieST = function(node, pre, arr){
  for(let i=0; i<R; i++){
    if(node.next[i]!=null){
      if(node.next[i].v!=null){
        arr.push(pre+String.fromCharCode(97 + i));
      }
      keysTrieST(node.next[i], pre+String.fromCharCode(97 + i), arr);
    }
  }
}

var deleteTrieST = function(node, s, index){
  if(node == null)return null;
  if(s.length == index){
    node.v = null;
  }else{
    node.next[s.charCodeAt(index)-97] = deleteTrieST(node.next[s.charCodeAt(index)-97], s, index+1);
  }
  if(node.v!=null)return node;
  for(let i=0; i<R; i++){
    if(node.next[i]!=null){
      return node;
    }
  }
  return null;
}

var Node3 = function(c){
  this.left = null;
  this.mid = null;
  this.right = null;
  this.c = c;
  this.v = null;
}

var TST = function(){
  this.root = null;
}

TST.prototype = {
  put: function(s, v){
    this.root = putTST(this.root, s, 0, v);
  },
  get: function(s){
    let node = getTST(this.root, s, 0);
    if(node.v!=null){
      return node.v;
    }else{
      return null;
    }
  },
  keys: function(){
    let queue = [];
    keysTST(this.root, queue, '');
    return queue;
  },
  keysWithPrefix: function(pre){
    let queue = [];
    let node = getTST(this.root, pre, 0);
    if(node==null){
      return queue;
    }
    keysTST(getTST(this.root, pre, 0).mid, queue, pre);
    return queue;
  },
  delete: function(s){
    deleteTST(this.root, s, 0);
  }
}

var putTST = function(node, s, index, v){
  let c = s.charCodeAt(index);
  if(node == null){
    node = new Node3(c);
  }
  if(node.c > c){
    node.left = putTST(node.left, s, index, v);
  }else if(node.c < c){
    node.right = putTST(node.right, s, index, v);
  }else if(s.length > index+1){
    node.mid = putTST(node.mid, s, index+1, v);
  }else if(s.length == index+1){
    node.v = v;
  }
  return node;
}

var getTST = function(node, s, index){
  if(node==null) return null;
  let c = s.charCodeAt(index);
  if(node.c > c){
    return getTST(node.left, s, index);
  }else if(node.c < c){
    return getTST(node.right, s, index);
  }else if(s.length > index+1){
    return getTST(node.mid, s, index+1);
  }else{
    return node;
  }
}

var keysTST = function(node, queue, pre){
  if(node==null)return;
  if(node.v!=null){
    queue.push(pre+String.fromCharCode(node.c));
  }
  keysTST(node.left, queue, pre);
  keysTST(node.mid, queue, pre+String.fromCharCode(node.c));
  keysTST(node.right, queue, pre);
}

var deleteTST = function(node, s, index){
  if(node==null)return null;
  if(node.c > s.charCodeAt(index)){
    node.left = deleteTST(node.left, s, index);
  }else if(node.c < s.charCodeAt(index)){
    node.right = deleteTST(node.right, s, index);
  }else if(s.length > index+1){
    node.mid = deleteTST(node.mid, s, index+1);
  }else{
    node.v = null;
  }

  if(node.mid != null){
    return node;
  }else{
    if(node.left!=null){
      //find the max node in left subtree
      temp = node.left;
      while(temp.right!=null){
        temp = temp.right;
      }
      return temp;
    }else if (node.right!=null) {
      temp = node.right;
      while(temp.left!=null){
        temp = temp.left;
      }
      return temp;
    }else{
      return null;
    }
  }
}

module.exports = {
  TrieST: TrieST,
  TST: TST
}
