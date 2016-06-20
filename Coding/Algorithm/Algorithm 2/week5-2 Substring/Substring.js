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

var BM = function(){

}

var RK = function(){

}

module.exports = {
  KMP:KMP,
  BM:BM,
  RK:RK
}
