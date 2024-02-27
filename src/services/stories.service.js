const https = require('https');

function getTimeStories(callback) {
  const options = {
    hostname: 'time.com',
    path: '/',
    method: 'GET',
  };

  const timeReq = https.request(options, (timeRes) => {
    let data = '';

    timeRes.on('data', (chunk) => {
      data += chunk.toString();
    });

    timeRes.on('end', () => {
      callback(data);
    });
  });

  timeReq.end();
}

module.exports = { getTimeStories };
