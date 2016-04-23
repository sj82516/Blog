var expect = require('chai').expect;
var ST = require('./ST.js');

//use eql() instead of equal()
describe('Symbol Table use Binary Tree', function(){
	it('ST max and min', function(){
		var st = new ST();
		st.insert('C',5);
		st.insert('A',3);
		st.insert('D',7);
		st.insert('K',10);
		st.insert('B',9);
		st.insert('G',5);
		expect(st.max()).equal(10);
		expect(st.min()).equal(3);
		//inorder
		st.iterator(st.root);
		expect(st.arr).to.eql(['A','B','C','D','G','K']);
	});
})