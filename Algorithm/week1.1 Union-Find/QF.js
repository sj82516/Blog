function QF(num){
	this.id = [num];
	this.len = num;
	this.init();
}

QF.prototype.init = function(){
	for(var i=0; i<this.len; i++){
		this.id[i] = i;
	}
}

QF.prototype.union = function(p, q){
	for(var i=0; i<this.len; i++){
		if(this.id[i]===p){
			this.id[i] = q;
		}
	}
}

QF.prototype.connected = function(p, q){
	if(this.id[p]!==this.id[q]){
		return false;
	}else{
		return true;
	}
}

module.exports = QF;