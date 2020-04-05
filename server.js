const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 5000;

let data = require('./data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/find_challenges', (req, res) => {
  let result = data.split(/\n/g).map(challenge => JSON.parse(challenge))
  return res.json(result)
});

app.listen(port, () => console.log(`Listening on port ${port}`));
