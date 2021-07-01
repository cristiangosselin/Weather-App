// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const https = require("https");



app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/",function(req,res){
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "d0108e42f5f1bc5b96fd34b41bdc2211";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=" + unit + "&q=" + query;
  https.get(url, function(response){
    // console.log(response);
    response.on("data", function(data){
      console.log(data);
      var weatherData = JSON.parse(data);
      console.log(weatherData);
      var temperature = weatherData.main.temp;
      var description = weatherData.weather[0].description;
      // console.log(typeof(temperature));
      // console.log(typeof(description));
      const icon = weatherData.weather[0].icon;
      res.write("<h1> The temperature in " + query + " is: " + temperature + " degrees celcius </h1>");
      res.write("<h2> The descriptiom of the weather is: " + description + "</h2>");
      res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'  alt='Weather-img'>");
      res.send();
    });

  });
});



app.listen("3000", function(){
  console.log("Server running in port 3000");
});
