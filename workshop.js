var request = require('request-promise');

// // Euclidian distance between two points
// function getDistance(pos1, pos2) {
//     return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
// }

function getIssPosition() {
    return request('http://api.open-notify.org/iss-now.json')
        .then(
            function(responce) {
                // Parse as JSON
                var data = JSON.parse(responce);
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
            function(responce) {
                var data = JSON.parse(responce);
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

}

function getCurrentTemperature(address) {

}

function getDistanceFromIss(address) {

}

exports.getIssPosition = getIssPosition;
exports.getAddressPosition = getAddressPosition;
exports.getCurrentTemperatureAtPosition = getCurrentTemperatureAtPosition;
exports.getCurrentTemperature = getCurrentTemperature;
exports.getDistanceFromIss = getDistanceFromIss;