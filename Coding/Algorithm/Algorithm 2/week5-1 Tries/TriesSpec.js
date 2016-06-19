var expect = require('chai').expect;
var TrieST = require('./Tries.js').TrieST;
var TST = require('./Tries.js').TST;

describe('Tries Implement', function(){
  it('TrieST', function(){
    var trieST = new TrieST();
    trieST.put('apple',3);
    trieST.put('shell',1);
    trieST.put('hello',2);
    trieST.put('holly',3);
    trieST.put('sea',4);
    trieST.put('she',2);
    trieST.put('shores',2);
    trieST.put('shelter',2);
    //console.log(trieST.get('shell'));
    trieST.delete('apple');
    console.log(trieST.keys());
  });
  it('TST', function(){
    var tst = new TST();
    tst.put('apple',1);
    tst.put('shell',1);
    tst.put('hello',2);
    tst.put('holly',3);
    tst.put('sea',4);
    tst.put('she',7);
    tst.put('shores',2);
    tst.put('shelter',2);
    // console.log(tst.get('she'));
    // console.log(tst.keys());
    // console.log(tst.keysWithPrefix('sea'));
    tst.delete('shores');
    // console.log(tst.delete('shores'));
    // console.log(tst.delete('holly'));
    console.log(tst.keys());
    // tst.put('sheller',2);
    // console.log(tst.keys());
  });
})
