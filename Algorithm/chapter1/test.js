var expect = require('chai').expect;
var QF = require('./QF.js');
var QU = require('./QU.js');
var WQU = require('./WQU.js');

describe('QF', function(){
	it('show spot connected', function(){
		var qf = new QF(8);
		qf.union(1,2);
		qf.union(2,3);
		expect(qf.connected(1,3)).to.equal(true);
	});
	it('show spot not connected', function(){
		var qf = new QF(8);
		qf.union(1,2);
		qf.union(2,3);
		expect(qf.connected(1,4)).to.equal(false);
	});
});

describe('QU', function(){
	it('show spot connected', function(){
		var qu = new QU(8);
		qu.union(1,2);
		qu.union(2,3);
		expect(qu.connected(1,3)).to.equal(true);
	});
	it('show spot not connected', function(){
		var qu = new QU(8);
		qu.union(1,2);
		qu.union(2,3);
		expect(qu.connected(1,4)).to.equal(false);
	});
})

describe('WQU', function(){
	it('show spot connected', function(){
		var wqu = new WQU(8);
		wqu.union(1,2);
		wqu.union(2,3);
		expect(wqu.connected(1,3)).to.equal(true);
	});
	it('show spot not connected', function(){
		var wqu = new QU(8);
		wqu.union(1,2);
		wqu.union(2,3);
		expect(wqu.connected(1,4)).to.equal(false);
	});
})