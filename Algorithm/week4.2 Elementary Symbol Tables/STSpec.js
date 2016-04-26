var expect = require('chai').expect;
var ST = require('./ST.js');

//use eql() instead of equal()
describe('Symbol Table use Binary Tree', function(){
	var st = new ST();
	st.insert('C',5);
	st.insert('A',3);
	st.insert('J',7);
	st.insert('K',10);
	st.insert('B',9);
	st.insert('G',5);

	it('ST find max and min value', function(){
		expect(st.max(st.root).value).equal(10);
		expect(st.min(st.root).value).equal(3);
		//inorder
	});
	it('ST ceiling and floor', function(){
		st.iterator(st.arr,st.root);
		expect(st.arr).to.eql(['A','B','C','G','J','K']);
		expect(st.ceiling('M')).equal('K');
		expect(st.floor('M')).equal(null);
		expect(st.floor('E')).equal('G');
	});
	it('ST delete', function(){
		st.delete(st.root,'B');
		st.iterator(st.arr,st.root);
		expect(st.arr).to.eql(['A','C','G','J','K']);
	});
	it('ST contains', function(){
		st.insert('R',7);
		st.insert('S',10);
		st.insert('Q',9);
		st.insert('L',5);
		st.insert('B',7);
		st.insert('I',10);
		expect(st.arr.length).to.eql(5);
	});
});