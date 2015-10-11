var express = require('express'),
    app = express(),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    bodyParser = require('body-parser'),
    sendParsedResponse;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sendParsedResponse = function( req, res, data ) {

  var user = {
    name: '',
    title: '',
    location: '',
    profile_picture: '',
    current_org: '',
    skills: []
  };

  $ = cheerio.load( data );
  user.name = $('span.full-name').text();
  user.title = $('p.title').text();
  user.location = $('#location .locality').text();
  user.profile_picture = $('.profile-picture img').attr('src');
  user.current_org = $('#overview-summary-current li a').text();

  $('li.endorse-item').each(function() {
    var skill;
    if( !$(this).attr('id') ) {
      skill = $(this).find('a.endorse-item-name-text').text();
      user.skills.push( skill );
    }
  });
  res.end( JSON.stringify( user ) );
};

// Rest api which pull data from linked in and send it to the client.
app.post('/users', function (req, res) {
  var link_url = req.body.linkUrl;

  request( link_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      sendParsedResponse( req, res, body );
    }
  });
});

// Below section handles all the static files.
app.get(/^(.+)$/, function(req, res){
  res.sendfile( __dirname + req.params[0]);
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Please check app at http://%s:%s", host, port);
});
