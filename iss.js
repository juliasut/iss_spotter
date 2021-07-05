
const request = require('request');



const fetchMyIp = function(callback) {
  request('https://api.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

  const ip = JSON.parse(body).ip;
  callback(null, ip);
  });
}

const fetchCoordsByIP = function(ip,callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if(error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `StatusCode ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, responce, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (responce.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).responce;
    callback(null, passes);
  });

};



module.exports = { fetchISSFlyOverTimes };