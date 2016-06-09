"use strict";

var events = require('events');
//Exam 1
//Check if Callback execute after stack clean.
function exam1() {
	setTimeout(function () {
		console.log("I am Async waiting for stack");
	}, 1000);

	(function IWanaBlockAsync() {
		for (var i = 0; i < 2000000000; i++) {
			if (i % 5000000 === 0) {
				console.log("wait....");
			}
		}
	})();
};

//Observe setImmediate and Nexttick behavior
function exam2() {
	setTimeout(function () {
		console.log("setImmediate would occur after me");
	}, 1000);

	setImmediate(function () {
		console.log("I wait at the end of I/O queue but now I/O queue is empty");
	});
}

function exam3() {
	setTimeout(function () {
		console.log("Nexttick would occur before me");
	}, 1000);

	process.nextTick(function () {
		console.log("I would insert into front of I/O queue");
	});
}

//enqueue I/O queue
function exam4() {
	setTimeout(function () {
		console.log("setImmediate would occur after me");
	}, 1000);

	setImmediate(function () {
		console.log("I wait at the end of I/O queue");
	});

	(function IWanaBlockAsync() {
		for (var i = 0; i < 500000000; i++) {
			if (i % 5000000 === 0) {
				console.log("wait....");
			}
		}
	})();
}

function exam5() {
	setTimeout(function () {
		console.log("Nexttick would occur before me");
	}, 1000);

	process.nextTick(function () {
		console.log("I would insert into front of I/O queue");
	});

	(function IWanaBlockAsync() {
		for (var i = 0; i < 500000000; i++) {
			if (i % 5000000 === 0) {
				console.log("wait....");
			}
		}
	})();
}

//Emit is sync
function exam6() {
	var eventEmitter = new events.EventEmitter();
	eventEmitter.on('step1', function () {
		console.log("Hello World 1");
	});
	eventEmitter.on('step2', function () {
		(function IWanaBlockYou() {
			for (var i = 0; i < 500000000; i++) {
				if (i % 5000000 === 0) {
					console.log("wait....");
				}
			}
		})();
		console.log("Hello World 2");
	});
	eventEmitter.emit("step1");
	eventEmitter.emit("step2");
	console.log("Event is sync so here is Hello World 3");
}

module.exports = {
	exam1: exam1,
	exam2: exam2,
	exam3: exam3,
	exam4: exam4,
	exam5: exam5,
	exam6: exam6,
	exam7: exam7
};