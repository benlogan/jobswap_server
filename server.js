var http = require('http'); //require the 'http' module
var url = require('url'); // just for parsing request

var express = require('express');
var app = express();

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow:");
});

// let the port be set by Heroku
var port = process.env.PORT || 1337; // locally, use 1337

// a middleware with no mount path; gets executed for every request to the app
app.use(function(req, res, next) {
    //res.setHeader('charset', 'utf-8')
    // CORS for local testing only?
    //res.writeHead(200, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'});
    // we don't want to set the response status yet!
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    next();
});

/*
app.get('/bookSearch', function(request, response) {
    var queryData = url.parse(request.url, true).query;
});
*/

// POST method route
app.post('/findMatch', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        
        var parsedResponse = body.split('&');
        var jobLocation = parsedResponse[0].split('=')[1];
        var jobSummary = decodeURIComponent(parsedResponse[1].substring(parsedResponse[1].indexOf('=') + 1));
        
        console.log("JOB LOCATION : " + jobLocation);
        console.log("JOB SUMMARY : " + jobSummary);

        // persist data to memory (need user ID!)

        // matching engine here
        var search = "Agile";
        var match;
        if(jobSummary.includes(search)) {
            match = "found a match on " + search;
        } else {
            match = "sorry, no match found";
        }

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('post acknowledged. match?' + match);
    });
    //response.send('POST request to the homepage');
});

app.listen(port, function () {
    console.log('UBSJOBSWAP Server - listening on port ' + port);
});