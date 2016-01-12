/*
 * Slack responder bot. A simple bot to respond to your slack messages.
 */

'use strict'

var request = require('request');

var config = require('./config.json');

var token = config.token;

/**
 * Function to make a callback that will do error-checking. If request is successful,
 * checks the ok param in the response and calls successFun or errorFun appropriately
 */
var apiCallbackMaker = function(successFun, errorFun) {
  return function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      if (data.ok) {
        successFun(data);
      } else {
        errorFun(data);
      }
    }
  }
};

var callApi = function(method, params, callback) {
  var targetUrl = 'https://slack.com/api/' + method;
  params = params || {};
  params.token = token;
  callback = callback ||
    apiCallbackMaker(console.log, function(data) {
      console.log('Error encountered: ' + data.error)
    });

  request({
    method: 'POST',
    url: targetUrl,
    form: params
  }, callback);
};

var rtmStart = callApi('rtm.start', {});
