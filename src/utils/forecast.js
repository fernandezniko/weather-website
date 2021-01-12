//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

//forecast(-75.7088, 44.1545, (error, data) => {
//    console.log('Error', error)
//    console.log('Data', data)
//  })

const request = require('request')

const forecast = (lattitude, longitude, callback) => {

    const openWeatherApiKey = process.env.OPENWEATHER_API_KEY
    const urlbycoordinates = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lattitude + '&lon=' + longitude + '&appid=' + openWeatherApiKey + '&units=metric'


    request({ url: urlbycoordinates, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to Weather service..', undefined)
        }
        else if (response.body.message) {
            callback('Unable to find location', undefined)
        }
        else {

            callback(undefined,
                response.body.weather[0].description + ', it is currently: ' + response.body.main.temp + ' °C, whit a ' + response.body.main.humidity + ' % of humidity. Tha max temperature for today is: ' + response.body.main.temp_max + '°C and the min temperature: ' + response.body.main.temp_min + ' °C'
            )
        }

    })


}

module.exports = forecast