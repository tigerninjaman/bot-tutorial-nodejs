var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/ellenbot$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();
  //ideally, want to either have it equal something else or just edit cool

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

//test - unclear on why it doesn't work
var getHttp = require('../utils').getHttp;

var getRandomDeveloperExcuse = function (cb) {
  getHttp({
    hostname: 'developerexcuses.com',
    path: '/',
    method: 'GET'
  }, function onResult(statusCode, data) {
    // adapted from https://github.com/github/hubot-scripts/blob/master/src/scripts/excuse.coffee#L55
    var matches = data.match(/<a [^>]+>(.+)<\/a>/i);
    if (matches && matches[1]) {
      cb(matches[1]);
    } else {
      cb('');
    }
  }, function onError() {
    cb('');
  });
};

var getRandomDesignerExcuse = (function () {
  // Taken from http://designerexcuses.com/js/excuses.js
  var quotes = [
    "Oui oui",
    "k",
    "GovCo is so far",
    "linguistics is so cool",
    "French guys are so hot",
    "Sorry I have rehearsal",
    "Sorry I'm at rehearsal",
    "I had me a boy turned into a man",
    "SymSys",
    "Paris",
    "Baguette",
    "oui",
    "Hey, fuck you, buddy",
    "*wink*",
    "It's snowing!!",
    "I have a performance that night",
    "TAPS stands for 'The Awesomest Part Of Stanford'",
    "Sops on top!",
    "Come drink chamomile tea and read checkhov with me",
    "Anyone else auditioning for the show this quarter?"
  ];

  return function (cb) {
    cb(quotes[Math.floor(Math.random() * quotes.length)]);
  };
})();
//end of test

exports.respond = respond;
