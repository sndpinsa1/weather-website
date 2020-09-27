const request = require('request');

const forecast = (lat, lng, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=167b6a515de08d517d2bf73eb38ce3b8&query="+lng+","+lat;
    request({
        url,
        json:true
    }, (error, {body})=>{
        if(error){
            callback("Unable to Connect with the weatherstack service",undefined);
        }else if(body.error){
            callback("Please provide correct langitude and latitude",undefined);

        }else{
            const {temperature, feelslike} = body.current;
            const result = `It is currently ${temperature} degree out. There is feelislike ${feelslike}`
            callback(undefined,result);
        }
    })
}

module.exports = forecast;