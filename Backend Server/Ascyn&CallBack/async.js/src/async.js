import "babel-polyfill";
import RX from "rx/RX";

import fs from "fs";

//normal callback;
fs.readFile("./data/data_src.json", (err, data)=>{
  if(err) throw new Error(err);
  let userid = JSON.parse(data).userid;
  console.log(userid);
  fs.readFile(`./data/${userid}.json`, (err, data)=>{
    if(err) throw new Error(err);
    let username = JSON.parse(data).username;
    console.log(username);
    fs.readFile(`./data/${username}_friend.json`, (err, data)=>{
      if(err) throw new Error(err);
      let userFriends = JSON.parse(data).friends;
      console.log(userFriends);
    });
  });
});

// with promise
function readUserID() {
  return new Promise((resolve, reject)=>{
    fs.readFile("./data/data_src.json", (err, data)=>{
      if(err) reject(err);
      let userid = JSON.parse(data).userid;
      resolve(userid);
      console.log(userid);
    });
  });
}

function readUsername(userid) {
  return new Promise((resolve, reject)=>{
    fs.readFile(`./data/${userid}.json`, (err, data)=>{
      if(err) reject(err);
      let username = JSON.parse(data).username;
      console.log(username);
      resolve(username);
    });
  });
}

function readUserFriends(username){
  return new Promise((resolve, reject)=>{
    fs.readFile(`./data/${username}_friend.json`, (err, data)=>{
      if(err) reject(err);
      let userFriends = JSON.parse(data).friends;
      console.log(userFriends);
      resolve(userFriends);
    });
  })
}

readUserID().then((userid)=>{
  return readUsername(userid)
}).then((username)=>{
  return readUserFriends(username)
}).then((userFriends)=>{
  console.log(`${userFriends}, Promise finished`);
});

// using generator
function* generator(){
  let userid = yield readUserID();
  let username = yield readUsername(userid);
  let userFriends = yield readUserFriends(username);
  console.log("generator finished");
}

function run(g) {
  let count = 0;
  let go = function(dataFromG){
    if(dataFromG.done){
      console.log("generator run finished");
    }else{
      let promise = dataFromG.value;
      promise.then((dataFromP)=>{
        count++;
        console.log(`Generator ${dataFromP}`);
        go(g.next(dataFromP));
      }).catch((err)=>{
        console.log(`${err} , generator stop!`);
      });
    }
  }
  go(g.next());
}
run(generator());

// Using Async
(async function(){
  try {
    let userid = await readUserID();
    let username = await readUsername(userid);
    let userFriends = await readUserFriends(username);
    console.log(`async finished, ${userFriends}`);
  }catch(err){
    console.log(err);
  }
})();
