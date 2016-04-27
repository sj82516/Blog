var BasicEval = function(infix){
	this.infix = infix;
	this.postfix = '';
	this.eval = 0;
} 

BasicEval.prototype.infixToPostfix = function(){
	var len = this.infix.length;
	var stack = [];
	var c = '';
	for(var i=0; i<len; i++){
		c = this.infix.charAt(i);
		if(c==='('){
			stack.push(c);
		}else if(c>='0' && c<='9'){
			this.postfix = this.postfix.concat(c);
		}else if(c==='+'||c==='-'||c==='*'||c==='/'){
			if(this.opPriority(c)<=this.opPriority(this.peek(stack)) && this.peek(stack)!=='(' && stack.length>0){
				this.postfix = this.postfix.concat(stack.pop());
			}
			stack.push(c);
		}else if(c===')'){
			while(this.peek(stack)!=='('){
				this.postfix = this.postfix.concat(stack.pop());
			}
			stack.pop();
		}
	}
	while(stack.length!==0){
		this.postfix = this.postfix.concat(stack.pop());
	}
}

BasicEval.prototype.postfixToEval = function(){
	var len = this.postfix.length;
	var numStack = [];
	var c = '';
	for(var i=0; i<len; i++){
		c = this.postfix.charAt(i);
		if(c>='0' && c<='9'){
			numStack.push(parseInt(c));
		}else if(c==='+'){
			numStack.push(numStack.pop()+numStack.pop());
		}else if(c==='-'){
			numStack.push(-1*numStack.pop()+numStack.pop());
		}else if(c==='*'){
			numStack.push(numStack.pop()*numStack.pop());
		}else if(c==='/'){
			numStack.push(Math.floor(1/numStack.pop()*numStack.pop()));
		}
	}
	this.eval = numStack.pop();
}

BasicEval.prototype.opPriority = function(op){
	return (op==='+'||op==='-'?1:2);
}

BasicEval.prototype.peek = function(stack){
	return stack[stack.length-1];
}

module.exports = BasicEval;
