var Sort2 = function(list){
	this.list = list;
	this.len = list.length;
}

Sort2.prototype.swap = function(list,a,b){
	var temp = list[a];
	list[a] = list[b];
	list[b] = temp;
}

Sort2.prototype.mergeSort = function(){
	var temp = [this.len];
	this.mSort(temp,0,this.len-1);
}

Sort2.prototype.mSort = function(temp, low, high){
	if(high===low){
		return ;
	}
	var mid = low + Math.floor((high-low)/2);
	this.mSort(temp, low, mid);
	this.mSort(temp, mid+1, high);
	this.merge(temp, low, high);
}

Sort2.prototype.merge = function(temp, low, high){
	var mid = Math.floor((low+high)/2);
	for(var k=0,i=low,j=mid+1; i<=mid || j<=high;k++){
		if(i>mid){
			temp[k] = this.list[j++];
		}else if(j>high){
			temp[k] = this.list[i++];
		}else if(this.list[i]<=this.list[j]){
			temp[k] = this.list[i++];
		}else{
			temp[k] = this.list[j++];
		}
	}
	for(var k=0,i = low; i<=high; i++,k++){
		this.list[i] = temp[k];
	}
	console.log(this.list);
}

Sort2.prototype.quickSort = function(){
	var low = 0;
	var high = this.len - 1;
	this.qSort(low,high);
}

Sort2.prototype.partition = function(low, high){

}

Sort2.prototype.qSort = function(low, high){

}


module.exports = Sort2;