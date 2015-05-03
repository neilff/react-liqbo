var express = require('express');
var request = require('superagent');
var R = require('ramda');
var cors = require('cors');

var app = express();

const LCBO_API_KEY = process.env.LCBO_API_KEY;
const API_ROOT = 'http://www.lcboapi.com/';

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/build'));
app.use(cors());

var server = app.listen(app.get('port'), function() {
  if (!LCBO_API_KEY) {
    this.close();
    console.error('Invalid LCBO_API_KEY, provide a working LCBO API Key as env variable.');
  } else {
    console.log('Node app is running at localhost:' + app.get('port'));
  }
});

app.get('/api/*', function (req, res) {
  const endpoint = req.params[0];
  console.log(LCBO_API_KEY);

 request
  .get(API_ROOT + endpoint)
  .set({
    'Authorization': 'Token ' + LCBO_API_KEY,
    'Accept': 'application/json'
  })
  .query(req.query)
  .end(function(err, data) {
    if (err || data.status >= 400) {
      console.error(err);
    }

    return res.status(data.status)
              .json(JSON.parse(data.text));
  });
});
