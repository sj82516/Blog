var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send("hello world");
});

app.get('/json', function(req, res){
  res.send(JSON.stringify({hello: 'world'}));
});

app.listen(3000, function(){
  console.log('Server on, listen port 3000');
})
