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


module.exports = {
	exam1,
	exam2,
	exam3,
	exam4,
	exam5

}