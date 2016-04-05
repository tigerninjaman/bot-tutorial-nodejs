var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;


function respond() {
  var request = JSON.parse(this.req.chunks[0]),
  //JSON.parse(this.req.chunks[0]),
      botRegex = /^ellenbot$/;

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
  
  var quotes = [
    "Oui oui",
    "k",
    "GovCo is so far",
    "I'm from Chicago",
    "linguistics is so cool",
    "French guys are so hot",
    "Sorry I have rehearsal",
    "Sorry I'm at rehearsal",
    "I had me a boy turned into a man",
    "I'm majoring in SymSys",
    "I'm in Paris",
    "Baguette",
    "oui",
    "Hey, fuck you, buddy",
    "*wink*",
    "It's snowing!!",
    "I have a performance that night",
    "TAPS stands for 'The Awesomest Part Of Stanford'",
    "Sops on top!",
    "Come drink chamomile tea and read checkhov with me",
    "Anyone else auditioning for the show this quarter?",
    "Can't argue with that",
  "( .o.)"
  ];

  botResponse = "hello";
  //quotes[Math.floor(Math.random() * quotes.length)];

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


exports.respond = respond;
