const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0f9e0562700430278457888000726562&query='+latitude+','+longitude+'&units=m'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            // console.log(body.current)
            let bd = body.current
            callback(undefined, {
                temperature: bd.temperature,
                feelslike: bd.feelslike,
                weather_descriptions: bd.weather_descriptions[0],
                observationTime: bd.observation_time,
                windSpeed: bd.wind_speed,
                pressure: bd.pressure,
                humidity: bd.humidity,
                cloudCover: bd.cloudcover,
                uvIndex: bd.uv_index,
                visibility: bd.visibility
            })
        }
    })
}


module.exports = forecast