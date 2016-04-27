var Sort = function(list){
	this.list = list;
	this.len = list.length;
}

Sort.prototype.swap = function(list,a,b){
	var temp = list[a];
	list[a] = list[b];
	list[b] = temp;
}

Sort.prototype.selectionSort = function(){
	var list = this.list;
	var min = 0;
	var temp = 0;
	for(var i=0; i<this.len; i++){
		min = i;
		for(var j=i+1; j<this.len; j++){
			if(list[min]>list[j]){
				min = j;
			}
		}
		this.swap(list,min,i);
	}
	return list;
}

Sort.prototype.insertionSort = function(){
	var list = this.list;
	var temp = 0;
	for(var i=0; i<this.len; i++){
		temp = list[i];
		for(var j=i; j>0 && list[j-1]>temp; j--){
			list[j] = list[j-1];
		}
		list[j] = temp;
	}
	return list;
}

Sort.prototype.shellSort = function(){
	var list = this.list;
	var h = 0;
	var temp = 0;
	while((3*h+1)<this.len){
		h++;
	}
	h--;
	var cross = 0;
	while(h>-1){
		cross = (3*h+1);
		for(var i=0; i<this.len;i+=cross){
			temp = list[i];
			for(var j=i; j>0 && list[j-cross]>temp; j-=cross){
				list[j] = list[j-cross];
			}
			list[j] = temp;
		}
		h--;
	}
	return list;
}

module.exports = Sort;