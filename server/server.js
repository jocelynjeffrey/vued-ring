const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const base = '/api/v1';
const port = 3000;

function getTemp(req, res) {
  res.json({
    temp: (Math.random() * 100).toFixed(2) - 0,
  });
}

app.use(bodyParser.json());
app.use(cors());
app.get(`${base}/temperature`, (req, res, next) => getTemp(req, res, next));
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`); // eslint-disable-line
});
