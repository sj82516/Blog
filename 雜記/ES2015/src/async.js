var events = require('events');
//Exam 1 
//Check if Callback execute after stack clean.
function exam1(){
	setTimeout(()=>{
		console.log("I am Async waiting for stack");
	},1000);

	(function IWanaBlockAsync(){
		for(var i = 0; i<2000000000; i++){
			if(i%5000000 === 0){
				console.log("wait....");
			}
		}
	})();
};

//Observe setImmediate and Nexttick behavior
function exam2(){
	setTimeout(()=>{
		console.log("setImmediate would occur after me");
	},1000);

	setImmediate(()=>{
		console.log("I wait at the end of I/O queue but now I/O queue is empty");
	});
}

function exam3(){
	setTimeout(()=>{
		console.log("Nexttick would occur before me");
	},1000);

	process.nextTick(()=>{
		console.log("I would insert into front of I/O queue");
	});
}

//enqueue I/O queue
function exam4(){
	setTimeout(()=>{
		console.log("setImmediate would occur after me");
	},1000);

	setImmediate(()=>{
		console.log("I wait at the end of I/O queue");
	});

	(function IWanaBlockAsync(){
		for(var i = 0; i<500000000; i++){
			if(i%5000000 === 0){
				console.log("wait....");
			}
		}
	})();
}

function exam5(){
	setTimeout(()=>{
		console.log("Nexttick would occur before me");
	},1000);

	process.nextTick(()=>{
		console.log("I would insert into front of I/O queue");
	});

	(function IWanaBlockAsync(){
		for(var i = 0; i<500000000; i++){
			if(i%5000000 === 0){
				console.log("wait....");
			}
		}
	})();
}

// Event emitter is async!
function exam6(){
	var eventEmitter = new events.EventEmitter();
	eventEmitter.on('step1', ()=>{
		console.log("Hello World 1");
	});
	eventEmitter.on('step2', ()=>{
		console.log("Hello World 2");
	});
	console.log("Event is sync so here is Hello World 3");
	eventEmitter.emit("step1");
	eventEmitter.emit("step2");
}

function exam7(){
	var eventEmitter = new events.EventEmitter();
	eventEmitter.on('step1', ()=>{
		console.log("Hello World 1");
	});
	eventEmitter.on('step2', ()=>{
		console.log("Hello World 2");
	});
	eventEmitter.emit("step1");
	console.log("Event is sync so here is Hello World 3");
	eventEmitter.emit("step2");
}


module.exports = {
	exam1,
	exam2,
	exam3,
	exam4,
	exam5,
	exam6,
	exam7
}