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
                const {temperature, feelslike, weather_descriptions} = data.forecast
                messageOne.textContent = data.location
                messageTwo.textContent = `It is a  ${weather_descriptions} weather, and it is currently ${temperature} ℃, and it feels like ${feelslike} ℃ :).`
            }
        })
    })
}, false)


