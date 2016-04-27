var PQ = function(size){
	this.size = size;
	this.arr = [0];
	//start store form 1 position.
	this.curr = 0;
}

PQ.prototype.insert = function(key){
	this.arr.push(key);
	++this.curr;
	this.swim(this.curr);
};

PQ.prototype.deleteMax = function(){
    var max = this.arr[1];
	this.swap(1,this.curr);
	this.curr--;
	this.sink(1);
	return max;
};

PQ.prototype.max = function(key){
	return this.arr[1];
};

PQ.prototype.swim = function(pos){
	while(this.arr[Math.floor(pos/2)]<this.arr[pos] && Math.floor(pos/2)>=1){
		this.swap(pos,Math.floor(pos/2));
		pos = Math.floor(pos/2);
	}
}

PQ.prototype.sink = function(pos){
    while(true){
    	if(pos*2 > this.curr){
    	    return;
    	}else if(pos*2+1 > this.curr){
    	    if(this.arr[pos]<this.arr[pos*2]){
    	        this.swap(pos,pos*2);
    	        pos = pos *2;
    	    }else{
    	        return;
    	    }
    	}else if(this.arr[pos]<this.arr[pos*2] || this.arr[pos]<this.arr[pos*2+1]){
    	    if(this.arr[pos*2]<this.arr[pos*2+1]){
    	        this.swap(pos,pos*2+1);
    	        pos = pos *2+1;
    	    }else{
    	        this.swap(pos,pos*2);
    	        pos = pos *2;
    	    }
    	}else{
    	    return;
    	}
    }
}

PQ.prototype.swap = function(a,b){
	var temp = this.arr[a];
	this.arr[a] = this.arr[b];
	this.arr[b] = temp;
}
module.exports = PQ;