var expect = require('chai').expect;
var BasicEval = require('./BE.js');

describe('BasicEval', function(){
	it('show infix to postfix', function(){
		var basicEval = new BasicEval('1+2*3');
		basicEval.infixToPostfix();
		expect(basicEval.postfix).to.equal('123*+');
	});
	it('show infix to postfix', function(){
		var basicEval = new BasicEval('1*(2+3)');
		basicEval.infixToPostfix();
		expect(basicEval.postfix).to.equal('123+*');
	});
	it('show infix to postfix', function(){
		var basicEval = new BasicEval('1*(2+3*2)');
		basicEval.infixToPostfix();
		expect(basicEval.postfix).to.equal('1232*+*');
	});
	it('show infix to postfix', function(){
		var basicEval = new BasicEval('1*(2+3*(2-1))');
		basicEval.infixToPostfix();
		expect(basicEval.postfix).to.equal('12321-*+*');
	});
});

describe('BasicEval', function(){
	it('show postfix to evaluate', function(){
		var basicEval = new BasicEval('1+2*3');
		basicEval.infixToPostfix();
		basicEval.postfixToEval();
		expect(basicEval.eval).to.equal(7);
	});
	it('show postfix to evaluate', function(){
		var basicEval = new BasicEval('2*(2+3)');
		basicEval.infixToPostfix();
		basicEval.postfixToEval();
		expect(basicEval.eval).to.equal(10);
	});
	it('show postfix to evaluate', function(){
		var basicEval = new BasicEval('1-(2*(3+2))');
		basicEval.infixToPostfix();
		basicEval.postfixToEval();
		expect(basicEval.eval).to.equal(-9);
	});
	it('show postfix to evaluate', function(){
		var basicEval = new BasicEval('8/(2+1)');
		basicEval.infixToPostfix();
		basicEval.postfixToEval();
		expect(basicEval.eval).to.equal(2);
	});

});