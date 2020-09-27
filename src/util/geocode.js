const request  = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic25kcGluc2ExIiwiYSI6ImNrZmhzeWl0MzAxb2kyem40MTAydDF5MjAifQ.72bmxAdl59QxJxOuZe-RoA&limit=1";
    request({url, json:true}, (error, {body})=>{
        if(error){
            console.log("")
            callback("Unable to connect with mapbox service", undefined);
        }else if(body.features.length <1){
            callback("Please provide valid location", undefined);
        }else{
            const locationCordination = {
                longitude:body.features[0].center[1],
                latitude:body.features[0].center[0],
                location:body.features[0].place_name
            }
            callback(undefined, locationCordination);
        }
    })
}

module.exports = geocode;