const http = require('http');
const router = require('./routes/stories.router');

const PORT = 3000;

const server = http.createServer(router.handleRequest);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
