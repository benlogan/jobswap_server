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

app.get('/allPeople', function(request, response) {
    response.end(JSON.stringify(peopleList));
});

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

var peopleList = [];
//bookList.push(book);

// POST method route
app.post('/findMatch', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        
        var parsedResponse = body.split('&');
        var name = parsedResponse[0].split('=')[1];
        var jobLocation = parsedResponse[1].split('=')[1];
        var jobSummary = decodeURIComponent(parsedResponse[2].substring(parsedResponse[2].indexOf('=') + 1));
        var search = parsedResponse[3].split('=')[1];

        console.log("NAME : " + name);
        console.log("JOB LOCATION : " + jobLocation);
        console.log("JOB SUMMARY : " + jobSummary);
        console.log("SEARCH : " + search);

        // persist data to memory (need user ID!)
        var person = {name:name,summary:jobSummary};
        peopleList.push(person);

        // matching engine here
        //var search = "Agile";
        var match;
        if(jobSummary.indexOf(search) > -1) {
            match = "found a match on " + search;
        } else {
            match = "sorry, no match found";
        }

        var newMatch;
        for (index = 0; index < peopleList.length; ++index) {
            console.log(peopleList[index]);

            if(peopleList[index].summary.indexOf(search) > -1) {
                newMatch += "Matched " + search + " for " + peopleList[index].name;
            }
        }

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Match? ' + newMatch);
    });
    //response.send('POST request to the homepage');
});

app.listen(port, function () {
    console.log('UBSJOBSWAP Server - listening on port ' + port);
});