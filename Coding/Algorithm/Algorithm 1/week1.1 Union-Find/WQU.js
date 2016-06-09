var WQU = function(num){
	this.id = [num];
	this.size = [num];
	this.len = num;
	this.init();

	this.root = function(p){
		while(this.id[p]!==p){
			p = this.id[p];
		}
		return p;
	}

	return this;
}

WQU.prototype.init = function(){
	for(var i=0; i<this.len; i++){
		this.id[i] = i;
		this.size==0;
	}
}

WQU.prototype.union = function(p, q){
	var i = this.root(p);
	var j = this.root(q);
	this.id[i] = j;
	if(this.size[p]>this.size[q]){
		this.id[j] = i;
	}else{
		this.id[i] = j;
	}
}

WQU.prototype.connected = function(p, q){
	if(this.root(this.id[p])!==this.root(this.id[q])){
		return false;
	}else{
		return true;
	}
}

module.exports = WQU;