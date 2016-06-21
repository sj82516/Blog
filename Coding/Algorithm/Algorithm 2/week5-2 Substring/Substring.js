const R = 26;
var KMP = function(pat){
  this.dfa = [];
  this.M = pat.length;
  let X = 0;
  //create DFA
  for(let i=0; i<R; i++){
    this.dfa.push([]);
    for(let j=0; j<this.M; j++){
      this.dfa[i].push(0);
    }
  }
  this.dfa[pat.charCodeAt(0)-97][0] = 1;
  for(let i=1; i<this.M; i++){
    for(let j=0; j<R; j++){
      this.dfa[j][i] = this.dfa[j][X];
    }
    this.dfa[pat.charCodeAt(i)-97][i] = i+1;
    X = this.dfa[pat.charCodeAt(i)-97][X];
  }
}

KMP.prototype = {
  search: function(s){
    for(let i=0,j=0; i<s.length; i++){
      j = this.dfa[s.charCodeAt(i)-97][j];
      if(j==this.M){
        return i-this.M+1;
      }
    }
    console.log(this.dfa);
    return s.length;
  }
}

var BM = function(pat){
  this.right = [];
  this.pat = pat;
  this.patLength = pat.length;
  for(let i=0; i<R; i++){
    this.right.push(-1);
  }
  for(let i=0; i<this.patLength; i++){
    this.right[pat.charCodeAt(i)-97] = i;
  }
}

BM.prototype.search = function(s){
  let skip = 0;
  for(let i=0; i<=s.length-this.patLength; i+=skip){
    skip = 0;
    for(let j=this.patLength-1; j>=0; j--){
      if(s.charCodeAt(i+j)!=this.pat.charCodeAt(j)){
        skip = j-this.right[s.charCodeAt(i+j)-97];
        skip = skip<1?1:skip;
        break;
      }
    }
    if(skip==0){
      return i;
    }
  }
  return s.length;
}

var Q = 997;
var RM = 1;
var RK = function(pat){
  this.pat = pat;
  this.patHashCode = 0;
  for(let i=0; i<pat.length; i++){
    this.patHashCode = ((this.patHashCode*R)%Q+pat.charCodeAt(i)-97)%Q;
  }
  for(let i=1; i<pat.length; i++){
    RM = (RM*R)%Q;
  }
}

RK.prototype.search = function(s){
  let txtHash = 0;
  for(let i=0; i< this.pat.length; i++){
    txtHash = ((txtHash*R)%Q+s.charCodeAt(i)-97)%Q;
  }
  if(txtHash==this.patHashCode){
    return 0;
  }
  for(let i=this.pat.length; i<s.length; i++){
    console.log(txtHash, RM,i);
    txtHash = (txtHash + Q - ((s.charCodeAt(i-this.pat.length)-97)*RM)%Q)%Q;
    txtHash = (txtHash*R + s.charCodeAt(i)-97)%Q;
    if(txtHash == this.patHashCode){
      return i-this.pat.length+1;
    }
  }
  return s.length
}

module.exports = {
  KMP:KMP,
  BM:BM,
  RK:RK
}
