var Node = function(key,value){
	this.key = key;
	this.value = value;
	this.next = null;
}

var HT = function(size){
	this.ht = [];
	this.size = size;
	for(var i=0;i<size;i++){
		this.ht.push(null);
	}
}

HT.prototype = {
	hashCode : function(key){
		var hash = 0, i, chr, len;
		if (key.length === 0) return hash;
		for (i = 0, len = key.length; i < len; i++) {
			chr   = key.charAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		//make sure hash is N
		return  (hash & 0x7fffffff) % this.size;
	},
	get : function(key){
		var node = this.ht[this.hashCode(key)];
		while(node!==null){
			if(node.key!==key){
				node = node.next;
			}else{
				return node.value;
			}
		}
		return null;
	},
	put : function(key,value){
		var node = new Node(key,value);
		var htNode = this.ht[this.hashCode(key)];
		if(htNode===null){
			this.ht[this.hashCode(key)] = node;
			return;
		}
		while(htNode.next!==null){
			if(key===htNode.key){
				htNode.value = value;
				return;
			}
			htNode = htNode.next;
		}
		htNode.next = node;
		return;
	}
};

module.exports = HT;