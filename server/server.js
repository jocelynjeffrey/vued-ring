const express = require('express');
const bodyParser = require('body-parser');
// const fallback = require('express-history-api-fallback');
// app.use(fallback('index.html', { root: this.assetsDirectory }));

const app = express();
const base = '/api/v1';

function getTemp(req, res) {
  res.json({
    temp: (Math.random() * 100).toFixed(2) - 0,
  });
}

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/api/v1/temperature');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

class Server {
  constructor() {
    this.port = 3000;
    this.assetsDirectory = '../dist';

    this.router = express.Router();
    this.router.get(`${base}/temperature`, (req, res, next) => getTemp(req, res, next));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Set up the routing.
    app.use((req, res, next) => {
      this.router(req, res, next);
    });

    app.use(express.static(this.assetsDirectory));

    app.use((err, req, res) => {
      console.log(`you got an error! ${req.url}: ${err}`);
      res.statusMessage = err.message || err; // eslint-disable-line
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
