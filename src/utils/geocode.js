const request = require('request')

const geocode = (address, callback) => {

    const urlMapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnVuaG91c2U0OSIsImEiOiJja2d0dGlzaWgwZWZ6MnJvNnVwdTJpZmpyIn0.rxdCWsgCVvMu_hJp_zvpIQ&limit=1'

    request({ url: urlMapbox, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to MapBox server...', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode