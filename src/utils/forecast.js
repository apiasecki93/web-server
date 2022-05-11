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
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_descriptions: body.current.weather_descriptions[0]
            })
        }
    })
}


module.exports = forecast