var IndexMinPQ = function(size){
	this.size = size;
	this.length = 1;
	this.pq = [0];
	this.qp = [];
	this.keys = [];
	this.init();
}

IndexMinPQ.prototype = {
	init : function(){
		for(var i=0; i<this.size; i++){
			this.pq.push(0);
			this.qp.push(-1);
			this.keys.push(null);
		}
	},
	insert : function(i, key){
		this.keys[i] = key;
		this.pq[this.length] = i;
		this.qp[i] = this.length;
		this.length++;
		this.swim(this.qp[i]);
	},
	deleteMin : function(){
		var min = this.pq[1];
		var minValue = this.keys[min];
		this.exch(1,--this.length);
		this.pq[this.length] = null;
		this.qp[min] = -1;
		this.keys[min] = null;
		this.sink(1);
		return min;
	},
	contains : function(i){
		return this.qp[i]!==-1;
	},
	decreaseKey : function(i, key){
		this.keys[i] = key;
		this.swim(this.qp[i]);
	},
	swim : function(pos){
		var j = Math.floor(pos/2);
		while(j>0 && this.keys[this.pq[pos]]<this.keys[this.pq[j]]){
			this.exch(pos,j);
			pos = j;
			j = Math.floor(j/2);
		}
	},
	sink : function(pos){
		var j = pos*2;
		while(j<this.length){
			if(this.keys[this.pq[pos]] > this.keys[this.pq[j]]){
				if(this.keys[this.pq[j]] > this.keys[this.pq[j+1]]){
					j++;
				}
				this.exch(pos,j);
				pos = j;
				j *=2;
			}else{
				break;
			}
		}
	},
	exch : function(i, j){
		var temp = this.pq[i];
		this.pq[i] = this.pq[j];
		this.pq[j] = temp;
		this.qp[this.pq[i]] = i;
		this.qp[this.pq[j]] = j;
	},
	isEmpty : function(){
		return this.length===1;
	}
}

module.exports = IndexMinPQ;