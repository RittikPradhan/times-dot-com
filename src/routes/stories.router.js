const controller = require('../controllers/stories.controller');

function handleRequest(req, res) {
  if (req.url === '/getTimeStories' && req.method === 'GET') {
    controller.fetchTimeStories(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

module.exports = { handleRequest };
