const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
    var city = req.body.city;
    var url = "https://api.openweathermap.org/data/2.5/weather?q= " + city + "&appid=af674649dd225df45555b6dbd18276eb&units=metric";

    https.get(url, function(response){
        response.on("data", function(data){
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            res.send("Temperature in " + city + " is" + temp);
        });
    });
});

app.listen(port, function(){
    console.log("Server is working");
});