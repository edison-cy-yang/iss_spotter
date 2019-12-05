const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  const promise = request('https://api.ipify.org?format=json');
  return promise;
};

/* 
 * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes = function(coords) {
  const latLong = JSON.parse(coords).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latLong.latitude}&lon=${latLong.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((passes) => {
    const { response } = JSON.parse(passes);
    return response;
  });
};

module.exports = {
  nextISSTimesForMyLocation
};