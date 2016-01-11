// server.js
var request = require('request');

var config = require('./config.json');

var token = config.token;

var callApi = function(method, params, callback) {
  var targetUrl = 'https://slack.com/api/' + method;
  params = params || {};
  params.token = token;

  request({
    method: 'POST',
    url: targetUrl,
    form: params
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
};

callApi('rtm.start');

