console.log("connected to authors.js");
var http = require('http');
var option ={
  host: "jsonplaceholder.typicode.com",
  path: "/users"
};

callback = function(res){
  var str="";
  res.on('name',function(chunk){
    str+=chunk;
  });
  res.on('end',function(){
    console.log(str);
  });
}

http.request(option, callback).end();
