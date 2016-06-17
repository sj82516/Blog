var expect = require('chai').expect;
var KeyIndexCounting = require('./StringSorting').KeyIndexCounting;
var LSD = require('./StringSorting').LSD;
var MSD = require('./StringSorting').MSD;
var Quick3String = require('./StringSorting').Quick3String;

describe('Week 3-2 String Sorting', function(){
	var s = ['a','b','a','g','h','b','c','y','a','n','m','m'];
	var keyIndexCounting = new KeyIndexCounting(s);
	it('Key-Index Sorting', function(){
		expect(keyIndexCounting.sorted).to.eql([ 'a', 'a', 'a', 'b', 'b', 'c', 'g', 'h', 'm', 'm', 'n', 'y' ]);
	})
	var s2 = ['aaa','aba','bcd','caa','haa','efh','aff','aef'];
	var lsd = new LSD(s2);
	it('LSD Sorting', function(){
		expect(lsd.sorted).to.eql([ 'aaa', 'aba', 'aef', 'aff', 'bcd', 'caa', 'efh', 'haa' ]);
	})
	var s3 = ['a','ab','bcd','caae','haas','efhf','abcc','abbbe','bca','b','eg','cf','aaaaaaaa'];
	var msd = new MSD(s3);
	it('MSD Sorting', function(){
		expect(msd.sorted).to.eql([ 'a','aaaaaaaa','ab','abbbe','abcc','b','bca','bcd','caae','cf','efhf','eg','haas' ]);
	})
	var quick3String = new Quick3String(s3);
	it('Quick3String Sorting', function(){
		expect(quick3String.sorted).to.eql([ 'a','aaaaaaaa','ab','abbbe','abcc','b','bca','bcd','caae','cf','efhf','eg','haas' ]);
	})
})
