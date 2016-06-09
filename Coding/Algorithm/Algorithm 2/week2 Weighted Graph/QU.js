var QU = function(num){
	this.id = [num];
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

QU.prototype.init = function(){
	for(var i=0; i<this.len; i++){
		this.id[i] = i;
	}
}

QU.prototype.union = function(p, q){
	var i = this.root(p);
	var j = this.root(q);
	this.id[i] = j;
}

QU.prototype.connected = function(p, q){
	if(this.root(this.id[p])!==this.root(this.id[q])){
		return false;
	}else{
		return true;
	}
}

module.exports = QU;