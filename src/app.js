const express = require('express');
const path = require('path');
const hbs = require('hbs');
//console.log(__dirname) // will print: D:\JavaScript\node\web-server\src
//console.log(__filename) // will print: D:\JavaScript\node\web-server\src\app.js
//console.log(path.join(__dirname, '../public')) // will print: D:\JavaScript\node\web-server\public

const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');



const app = express();

//Define paths for Express config
const publicDirecotryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirecotryPath))

app.get('', (req, res)  => {
    res.render('index', {
        title: 'Weather',
        name: 'Artur Piasecki'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About project',
        name: 'Artur Piasecki'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help',
        title: 'Help',
        name: 'Artur Piasecki'
    })
})


// app.use(express.static(helpPage))
// app.use(express.static(aboutPage))

// app.com
    // app.get('', (req, res) => {
    //     res.send('<h1>Weather</h1>'); //sent html to client
    // })

// app.com/help
    // app.get('/help', (req, res) => { 
    //     res.send({ //sent JSON format to client
    //         name: 'Weather',
    //         version: '1.0.0'
    //     });
    // })


// app.com/about
    // app.get('/about', (req, res) => {
    //     res.send('<h1>About page</h1>');
    // })

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address search term'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            } 
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                });
            })
        })
    }
})

app.get('/products', (req,res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: []
        })
    }
})



app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Artur Piasecki',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Artur Piasecki',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})