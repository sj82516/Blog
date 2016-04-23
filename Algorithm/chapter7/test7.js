var expect = require('chai').expect;
var ST = require('./ST.js');

//use eql() instead of equal()
describe('Symbol Table use Binary Tree', function(){
	it('ST max and min', function(){
		var st = new ST();
		st.insert('C',5);
		st.insert('A',3);
		st.insert('J',7);
		st.insert('K',10);
		st.insert('B',9);
		st.insert('G',5);
		expect(st.max(st.root).value).equal(10);
		expect(st.min(st.root).value).equal(3);
		//inorder
		st.iterator(st.arr,st.root);
		expect(st.arr).to.eql(['A','B','C','G','J','K']);
		expect(st.ceiling('M')).equal('K');
		expect(st.floor('M')).equal(null);
		expect(st.floor('E')).equal('G');
		st.delete(st.root,'B');
		st.iterator(st.arr,st.root);
		expect(st.arr).to.eql(['A','C','G','J','K']);
	});
})