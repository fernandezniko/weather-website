const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT

//Defines paths for express configure
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup hadlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nicolas Fernandez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nicolas Fernandez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptxt: 'Insert the city name that you want to know about the real time forecast.',
        name: 'Nicolas Fernandez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the city name'
        })
    }
    //el 2do parametro de la callback de geocode lo paso como un objeto destructuring (antes era solo data) y
    //el = {} es para ponerle valores por defecto asi no pincha
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicolas Fernandez',
        errorMsj: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nicolas Fernandez',
        errorMsj: 'Page not found'
    })
})

app.listen(port, () => {

    console.log('Server is up on port ' + port)
})
