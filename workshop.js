var request = require('request-promise');

// // Euclidian distance between two points
function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
    return request('http://api.open-notify.org/iss-now.json')
        .then(
            function(response) {
                // Parse as JSON
                var data = JSON.parse(response);
                // Return object with lat and lng
                var lat = data.iss_position.latitude;
                var lng = data.iss_position.longitude;
                return {lat, lng};
            }
        ).catch(
            function(error){
                console.log('Something is wrong ' + error); 
            }
        )
}

function getAddressPosition(address) {
    return request('https://maps.googleapis.com/maps/api/geocode/json?address='+ address)
        .then(
            function(response) {
                var data = JSON.parse(response);
                return {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng
                }
            }
        ).catch(
            function(error){
                console.log("Something is wrong... what have I done!!! " + error)
            }
        )
}

function getCurrentTemperatureAtPosition(position) {
    var lat = position.lat;
    var lng = position.lng;
    return request('https://api.darksky.net/forecast/1dc5929dbe2bd5743da0570670bc4ae2/'+lat+','+lng)
        .then(
            function(response) {
                var data = JSON.parse(response);
                return data.currently.temperature;
            }
        ).catch(
            function(error) {
                console.log("Something is wrong... what have I done!!! " + error);
            }
        )
}

function getCurrentTemperature(address) {
    return getAddressPosition(address)
        .then(getCurrentTemperatureAtPosition)
        .catch(
            function(error) {
                console.log("Something is wrong... what have I done!!! " + error);
            }
        )
}

function getDistanceFromIss(address) {
    return Promise.all([getAddressPosition(address),getIssPosition()])
        .then(function (positions) {
            return getDistance(positions[0], positions[1]);
        })
}

exports.getIssPosition = getIssPosition;
exports.getAddressPosition = getAddressPosition;
exports.getCurrentTemperatureAtPosition = getCurrentTemperatureAtPosition;
exports.getCurrentTemperature = getCurrentTemperature;
exports.getDistanceFromIss = getDistanceFromIss;