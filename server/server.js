const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const app = express();

const base = '/api/v1';

function getTemp(req, res /* , next */) {
  res.json({
    temp: (Math.random() * 100).toFixed(2) - 0,
  });
}

class Server {
  constructor() {
    this.port = 3000;
    this.assetsDirectory = '../dist';

    this.router = express.Router();
    this.router.get(`${base}/gettemperature`, (req, res, next) => getTemp(req, res, next));

    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
      })
    );

    // Set up the routing.
    app.use((req, res, next) => {
      this.router(req, res, next);
    });
    app.use(express.static(this.assetsDirectory));

    app.use(fallback('index.html', { root: this.assetsDirectory }));

    app.use((err, req, res, next) => {
      console.log(req.url + ': ' + err);
      res.statusMessage = err.message || err;
      res.status(err.status || 500).end();
    });
  }

  start() {
    app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}!`);
    });
  }
}

const server = new Server();
server.start();

module.exports = Server;
