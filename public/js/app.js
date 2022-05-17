console.log('Client side javascript file is loaded into index.js when requested by the server');

// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data)
//     }
//     )
// })

// fetch('http://localhost:3000/weather?address=london').then((response) => {
//     response.json().then(data => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)  
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const iframeMap = document.querySelector('#map')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const search = document.querySelector('input').value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + search).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                // console.log(data.location)
                // console.log(data.forecast)
                const {temperature, feelslike, weather_descriptions, observationTime, windSpeed, pressure,humidity, cloudCover, uvIndex,visibility} = data.forecast
                messageOne.textContent = data.location
                const lat = data.latitude;
                const lon = data.longitude;
               
                const address = data.location.charAt(0).toUpperCase() + data.address.slice(1)
                let quickSentence;
                if (temperature < feelslike) {
                    quickSentence = `but it feels as the temperature is higher:  ${feelslike} ℃`
                } else if (temperature > feelslike) {
                    quickSentence = `but it feels as the temperature is lower: ${feelslike} ℃`
                } else {
                    quickSentence = "and we can feel like same temperature"
                }
                // add <br> after address

                messageTwo.textContent = `It is ${observationTime} in ${address}
                and is ${weather_descriptions} weather,  current temperature is ${temperature} ℃, ${quickSentence}   ,
                the wind speed is: ${windSpeed} km/h, pressure: ${pressure}Pa, humidity: ${humidity}%, cloud-cover: ${cloudCover}%, uv-index: ${uvIndex}UV, visibility: ${visibility}%.`
                function initMap(lat,lon) {

                    var macc = {lat: lat, lng: lon};
            
                    var map = new google.maps.Map(
            
                        document.getElementById('map'), {zoom: 15, center: macc});
            
                    var marker = new google.maps.Marker({position: macc, map: map});
  
                  }
                initMap(lat,lon)
            }      
            //change the iframe map to the map of the search loca
        })
    })
}, false)


