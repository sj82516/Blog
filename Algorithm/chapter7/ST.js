var Node = function(key,value){
	this.key = key;
	this.value = value;
	this.left = null;
	this.right = null;
	this.count = 0;
}

var BST = function(){
	this.root = null;
	this.arr = [];
}

BST.prototype = {
	insert: function(k,v){
		if(this.root===null){
			this.root = new Node(k,v);
			return;
		}
		var point = this.root;
		var newNode = new Node(k,v);
		while(true){
			if(point.key===k){
				point.value = v;
				return
			}else if(point.key > k){
				if(point.left===null){
					point.left = newNode;
					return;
				}else{
					point = point.left;
				}
			}else{
				if(point.right===null){
					point.right = newNode;
					return;
				}else{
					point = point.right;
				}
			}
		}
	},
	delete: function(k){

	},
	max: function(){
		var point = this.root;
		while(point.right!==null){
			point = point.right;
		}
		return point.value;
	},
	min: function(){
		var point = this.root;
		while(point.left!==null){
			point = point.left;
		}
		return point.value;

	},
	iterator: function(node){
		if(node===null){
			return;
		}
		this.iterator(node.left);
		this.arr.push(node.key);
		this.iterator(node.right);
	},
	floor: function(){

	},
	ceiling: function(){

	}
}

module.exports = BST;