"use strict";

require("babel-polyfill");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var _marked = [generator].map(regeneratorRuntime.mark);

//normal callback;
_fs2.default.readFile("./data/data_src.json", function (err, data) {
  if (err) throw new Error(err);
  var userid = JSON.parse(data).userid;
  console.log(userid);
  _fs2.default.readFile("./data/" + userid + ".json", function (err, data) {
    if (err) throw new Error(err);
    var username = JSON.parse(data).username;
    console.log(username);
    _fs2.default.readFile("./data/" + username + "_friend.json", function (err, data) {
      if (err) throw new Error(err);
      var userFriends = JSON.parse(data).friends;
      console.log(userFriends);
    });
  });
});

// with promise
function readUserID() {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile("./data/data_src.json", function (err, data) {
      if (err) reject(err);
      var userid = JSON.parse(data).userid;
      resolve(userid);
      console.log(userid);
    });
  });
}

function readUsername(userid) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile("./data/" + userid + ".json", function (err, data) {
      if (err) reject(err);
      var username = JSON.parse(data).username;
      console.log(username);
      resolve(username);
    });
  });
}

function readUserFriends(username) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile("./data/" + username + "_friend.json", function (err, data) {
      if (err) reject(err);
      var userFriends = JSON.parse(data).friends;
      console.log(userFriends);
      resolve(userFriends);
    });
  });
}

readUserID().then(function (userid) {
  return readUsername(userid);
}).then(function (username) {
  return readUserFriends(username);
}).then(function (userFriends) {
  console.log(userFriends + ", Promise finished");
});

// using generator
function generator() {
  var userid, username, userFriends;
  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return readUserID();

        case 2:
          userid = _context.sent;
          _context.next = 5;
          return readUsername(userid);

        case 5:
          username = _context.sent;
          _context.next = 8;
          return readUserFriends(username);

        case 8:
          userFriends = _context.sent;

          console.log("generator finished");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function run(g) {
  var count = 0;
  var go = function go(dataFromG) {
    if (dataFromG.done) {
      console.log("generator run finished");
    } else {
      var promise = dataFromG.value;
      promise.then(function (dataFromP) {
        count++;
        console.log("Generator " + dataFromP);
        go(g.next(dataFromP));
      }).catch(function (err) {
        console.log(err + " , generator stop!");
      });
    }
  };
  go(g.next());
}
run(generator());

// Using Async
_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var userid, username, userFriends;
  return regeneratorRuntime.wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return readUserID();

        case 3:
          userid = _context2.sent;
          _context2.next = 6;
          return readUsername(userid);

        case 6:
          username = _context2.sent;
          _context2.next = 9;
          return readUserFriends(username);

        case 9:
          userFriends = _context2.sent;

          console.log("async finished, " + userFriends);
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);

          console.log(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee, this, [[0, 13]]);
}))();