const express           =  require('express');
const path              =  require('path');
const app               =  express();
const request           =  require('request');
const cookieParser      =  require('cookie-parser');
const bodyParser        =  require('body-parser');
const urlencodedParser  =  bodyParser.urlencoded({extended : true});


app.get('/',function(req, res){
  console.log("root");
  res.sendFile(path.join(__dirname,'fold','new.html'));
});
app.get('/setcookie',function(req, res){
  console.log("Setting cookies");
  // let op={
  //   age: 1000*30,
  //   httpOnly: true,
  //   signed: false
  // }
  res.clearCookie();
  res.cookie('name','ashish'/*,op*/).cookie('age','19').send("aaaaannnnd it`s done");
});
app.use(cookieParser());
app.get('/getcookies',function(req,res){
  console.log("getting cookies....");
//  console.log("cookies---------");
//  console.log(req.cookies);
  res.send(JSON.stringify(req.cookies));
});
app.get('/robots.txt',function(req, res){
  console.log("Access Denied....");
  res.status(403).send("Access Denied");
});
app.get('/html',function(req, res){
  console.log("Rendering HTML page....");
  res.sendFile(path.join(__dirname,'fold','authors.html'));
});
app.get('/input',function(req, res){
  res.sendFile(path.join(__dirname,'fold','form.html'));
});
app.post('/userlogin',urlencodedParser,function(req, res){
  console.log("Submitted Value :"+req.body["myname"]);
  var x= req.body['myname'];
  // res.send(JSON.stringify(x));
  res.send("Is this, what you just typed :"+x);
});
app.get('/authors',function(req, res){
  let str='';
  request('http://jsonplaceholder.typicode.com/users',function(error,res2 , body){
  //  console.log(body);
    var data=JSON.parse(body);
//    console.log(" \n ---------------------------------------------------\n\n");
//    console.log(data);
//    for(var i=0;i<data.length;i++){
//      console.log(data[i]["name"]+"***");
//    }
    request('http://jsonplaceholder.typicode.com/posts',function(error,res2,body2){
      var data2=JSON.parse(body2);
      var count=[];
      for(var i=0;i<data.length;i++)
        count[i]=0;
      for(var i=0;i<data2.length;i++){
        count[data2[i]["userId"]-1]++;
      }
      for(var i=0;i<data.length;i++){
//        console.log(data[i]["name"]+" - "+count[i]);
        str+="<li>"+data[i]["name"]+" - "+count[i]+"</li>";
      }
      res.send(str);
    });
  });
});
app.listen(8080,function(){
  console.log('listening to port 8080!');
});
