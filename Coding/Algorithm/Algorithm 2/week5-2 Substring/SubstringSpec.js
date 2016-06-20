var expect = require('chai').expect;
var KMP = require('./Substring.js').KMP;

describe('Substring',function(){
  it('Knuth-Morris-Pratt', function(){
    var kmp = new KMP('needle');
    console.log(kmp.search('inahaysdqwewqstacjneedleinajkqwe'));
  })
})
