var expect = require('chai').expect;
var NFA = require('./RE.js');

describe('Regular Expression', function(){
  it('Regular Expression', function(){
    var re = new NFA('((A*B|AC*|AD*)D)');
    console.log(re.recognize('AAAAABD'));
    console.log(re.recognize('ADDDDDDD'));
    console.log(re.recognize('ACCCCCD'));
    console.log(re.recognize('AABCD'));
  })
})
