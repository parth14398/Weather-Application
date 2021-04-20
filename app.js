const express = require('express');
const app =express();
const https = require('https');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended :true}))

app.listen(3000,function(){
  console.log("server started at port 3000");


})
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")

})
app.post("/",function(req,res){

  var query=req.body.city;
  var apikey="1d2d1971c835562c1e46abb80cca5036"
  var units="metric"
  var url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apikey +"&units="+ units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
    var weatherData = JSON.parse(data);
    var temp=weatherData.main.temp;
    var weatherStatus=weatherData.weather[0].description;
    var icon=weatherData.weather[0].icon;
    var imageurl="http://openweathermap.org/img/wn/"+ icon+"@2x.png"
    res.set("content-type", "text/html");

    res.write("<h3>The current weather status is " + weatherStatus + "</h3>");
    res.write("<h1>The temp of "+ query+" is " + temp +"</h1>");
    res.write("<img src="+ imageurl +">")
    res.send();
    })
 })
});
