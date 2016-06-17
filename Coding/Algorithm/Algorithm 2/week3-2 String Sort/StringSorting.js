var KeyIndexCounting = function(s){
	this.sorted = [];
	var len = s.length;
	var index = [];

	//create index , string is in [a-z]
	for(let i=0; i<27; i++){
		index.push(0);
	}

	for(let i=0; i<len; i++){
		this.sorted.push('');
		index[s[i].charCodeAt(0)-96]++;
	}

	for(let r=1; r<27; r++){
		index[r] += index[r-1];
	}

	for(let i=0; i<len; i++){
		this.sorted[index[s[i].charCodeAt(0)-97]++] = s[i];
	}
}

var LSD = function(s){
	this.sorted = [];
	var len = s.length;
	var word_len = s[0].length;
	var index = [];
	for(let j=word_len-1; j>=0; j--){
		for(let i=0; i<27; i++){
			if(index.length<27){
				index.push(0);
			}else{
				index[i] = 0;
			}
		}

		for(let i=0; i<len; i++){
			if(this.sorted.length < len){
					this.sorted.push('');
			}
			index[s[i].charCodeAt(j)-96]++;
		}

		for(let r=1; r<27; r++){
			index[r] += index[r-1];
		}

		for(let i=0; i<len; i++){
			this.sorted[index[s[i].charCodeAt(j)-97]++] = s[i];
		}

		for(let i=0; i<len; i++){
				s[i] = this.sorted[i];

		}
	}
}

var MSD = function(s){
	this.sorted = [];
	var len = s.length;

	this.sort = function(lo,hi,index){
		if(hi<=lo){
			return;
		}
		var count = [];
		for(let i=0; i<28; i++){
			count.push(0);
		}
		for(let i=lo; i<=hi; i++){
			if(s[i].length<=index){
				count[1]++;
			}else{
				count[s[i].charCodeAt(index)-97+2]++;
			}
		}
		for(let i=0; i<27; i++){
			count[i+1] += count[i];
		}
		for(let i=lo; i<=hi; i++){
			if(s[i].length<=index){
				this.sorted[count[0]++] = s[i];
			}else{
				this.sorted[count[s[i].charCodeAt(index)-97+1]++] = s[i];
			}
		}
		for(let i=lo; i<=hi; i++){
			s[i] = this.sorted[i-lo];
		}
		for(let i=0; i<26; i++){
			this.sort(lo+count[i],lo+count[i+1]-1,index+1);
		}
	}
	this.sort(0, len-1, 0);
	this.sorted = s;
}

var Quick3String = function(s){
	this.sorted = [];
	len = s.length;

	this.sort = function(lo,hi,index){
		if(hi<=lo){
			return;
		}
		let t = s[lo].length<=index?-1:s[lo].charCodeAt(index);
		let lt=lo,gt=hi;
		for(let i=lo+1; i<=gt;){
			let v = s[i].length<=index?-1:s[i].charCodeAt(index);
			if(t>v){
				exch(s,lt++,i++);
			}else if(t<v){
				exch(s,gt--,i);
			}else{
				i++;
			}
		}
		this.sort(lo,lt-1,index);
		if(t>0) this.sort(lt,gt, index++);
		this.sort(gt+1,hi, index);
	}
	function exch(s, a, b){
		let temp = s[a];
		s[a] = s[b];
		s[b] = temp;
	}
	this.sorted = s;
}

module.exports = {
	KeyIndexCounting : KeyIndexCounting,
	LSD : LSD,
	MSD : MSD,
	Quick3String : Quick3String
}
