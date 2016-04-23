var Node = function(key,value){
	this.key = key;
	this.value = value;
	this.left = null;
	this.right = null;
	this.count = 1;
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
				point.count++;
				if(point.left===null){
					point.left = newNode;
					return;
				}else{
					point = point.left;
				}
			}else{
				point.count++;
				if(point.right===null){
					point.right = newNode;
					return;
				}else{
					point = point.right;
				}
			}
		}
	},
	find: function(k){
		var point = this.root;
		while(true){
			if(point.key === k){
				return point;
			}else if(point.key > k){
				if(point.left){
					point = point.left;
				}else{
					return null;
				}
			}else{
				if(point.right){
					point = point.right;
				}else{
					return null;
				}
			}
		}
	},
	delete: function(point,k){
		if(point===null){
			return null;
		}
		if(point.key>k){
			point.left = this.delete(point.left,k);
		}
		if(point.key<k){
			point.right = this.delete(point.right,k);
		}
		if(point.key===k){
			if(point.left===null){
				return point.right;
			}
			if(point.right===null){
				return point.left;
			}

			var temp = point;
			point = this.min(point.right);
			point.right = this.deleteMin(temp.right);
			point.left = temp.left;
		}
		point.count--;
		return point;
	},
	deleteMin: function(point){
		if(point.left===null){
			return point.right;
		}
		point.left = this.deleteMin(point.left);
		return point;
	},
	max: function(point){
		while(point.right!==null){
			point = point.right;
		}
		return point;
	},
	min: function(point){
		while(point.left!==null){
			point = point.left;
		}
		return point;

	},
	iterator: function(node){
		this.arr = [];
		pIterator(this.arr,this.root);
	},
	ceiling: function(k){
		var temp = null;
		var point = this.root;
		while(true){
			if(point.key===k){
				return k;
			}else if(point.key>k){
				if(point.left){
					point = point.left;
				}else{
					return temp;
				}
			}else{
				temp = (point.key-k)>(temp-k)? temp:point.key;
				if(point.right){
					point = point.right;
				}else{
					return temp;
				}
			}
		}
	},
	floor: function(k){
		var temp = null;
		var point = this.root;
		while(true){
			if(point.key===k){
				return k;
			}else if(point.key>k){
				temp = (point.key-k)>(temp-k)? temp:point.key;
				if(point.left){
					point = point.left;
				}else{
					return temp;
				}
			}else{
				if(point.right){
					point = point.right;
				}else{
					return temp;
				}
			}
		}
	}
}

function pIterator(arr,node){
	if(node===null){
		return;
	}
	pIterator(arr,node.left);
	arr.push(node.key);
	pIterator(arr,node.right);
}
module.exports = BST;