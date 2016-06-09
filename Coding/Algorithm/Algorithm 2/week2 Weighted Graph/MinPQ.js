var MinPQ = function(size){
	this.size = size;
	this.length = 0;
	this.key = [];
	function init(){
		for(var i=0; i<this.size; i++){
			this.key.push(null);
		}
	}
	init.bind(this)();
}

MinPQ.prototype = {
	insert : function(v){
		this.key[++this.length] = v;
		swim(this.key,this.length);
	},
	deleteMin : function(){
		var min = this.key[1];
		swap(this.key,1,this.length);
		this.length--;
		sink(this.key,this.length);
		return min;
	},
	isEmpty : function(){
		return this.point === 0;
	},
	output : function(){
		return this.key.slice(1,this.length);
	}
}

function swim(arr,point){
	while(point>1 && arr[point]<arr[Math.floor(point/2)]){
		swap(arr,point,Math.floor(point/2));
		point = Math.floor(point/2);
	}
}
function sink(arr,len){
	var temp = 0;
	point = 1;
	while(point*2 <= len){
		temp = point * 2;
		if(temp<len && arr[temp]>arr[temp+1]){
			temp ++;
		}
		if(arr[point]>arr[temp]){
			swap(arr,point,temp);
			point = temp;
		}else{
			break;
		}
	}
}
function swap(arr,p1,p2){
	var temp = arr[p1];
	arr[p1] = arr[p2];
	arr[p2] = temp;
}

module.exports = MinPQ;