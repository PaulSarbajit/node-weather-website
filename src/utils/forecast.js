const request = require('request');

const getforecast = (latitude, longitude, callBack) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=f7c0b020bb0fec7ae7ebf763840c39e2&query=" + latitude + "," + longitude + "&units=m";

    request({ url: weatherURL, json: true }, (error, response) => {

        if(error){
            callBack("Unable to connect to weather service");
        }else if(response.body.error){
            callBack("unable to find location");
        }else{
            callBack(undefined, {
                temperature: response.body.current.temperature,
                feelTemperature: response.body.current.feelslike,
                precipitation: response.body.current.precip,
                description: response.body.current.weather_descriptions[0],
                location: response.body.location.name + ', ' + response.body.location.region + ', ' + response.body.location.country,
                message: `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} °C out. It feels like ${response.body.current.feelslike} °C. Relative humidity is ${response.body.current.humidity}%`,
            });
        }
    });
};

module.exports = getforecast;