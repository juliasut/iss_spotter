
const request = require('request');



const fetchMyIp = function(callback) {
  request('https://api.org?format=json', (error, responce, body) => {
    if (error) {
      return callback(error, null);
    }

    if (responce.statusCode !== 200) {
      callback(Error(`Status Code ${responce.statusCode} when fetching IP: ${body}`), null);
      return;
    }

  const ip = JSON.parse(body).ip;
  callback(null, ip);
  });
}

module.exports = { fetchMyIp };