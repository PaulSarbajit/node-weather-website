const request = require('request');

const getGeoCode = (address, callBack) => {
    const geocodingURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmxhemU3MjAiLCJhIjoiY2tlaW9iMDd4MG1tZjJ0bXU0N3puNGU4cSJ9.BOUT69Z7_Zv8QLd-VKsPww&limit=1";

    request({url: geocodingURL, json: true}, (error, response) => {

        if(error){
            callBack("Unable to connect to geocoding service");
        }else if(response.body.features.length === 0){
            callBack("Unable to find location");
        }else{
            callBack( undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            });
        }
    });
};

module.exports = getGeoCode;