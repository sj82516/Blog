var expect = require('chai').expect;
var KMP = require('./Substring.js').KMP;
var BM = require('./Substring.js').BM;
var RK = require('./Substring.js').RK;

describe('Substring',function(){
  it('Knuth-Morris-Pratt', function(){
    var kmp = new KMP('needle');
    console.log(kmp.search('inahaysdqwewqstacjneedleinajkqwe'));
    var bm = new BM('needle');
    console.log(bm.search('inahaysdqwewqstacjneedleinajkqwe'));
    var rk = new RK('needle');
    console.log(rk.search('inahaysdqwewqstacjneedleinajkqwe'));
  })
})
