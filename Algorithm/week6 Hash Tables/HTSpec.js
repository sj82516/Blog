var expect = require('chai').expect;
var HT = require('./HT.js');

//use eql() instead of equal()
describe('Hash Table use separate chaing', function(){
	it('HT implement', function(){
		var ht = new HT(10);
		ht.put('2',5);
		ht.put('8',3);
		ht.put('6',6);
		ht.put('4',10);
		ht.put('sadqeqewqda',5);
		expect(ht.get('2')).equal(5);
		expect(ht.get('bb')).equal(null);
	});
})