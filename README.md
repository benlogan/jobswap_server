# jobswap_server

Hackathon 2016 Project - Job Swap

A basic app that integrates with the LinkedIn API to pull profile information for all users and then provide a matching function.

NodeJS server is deployed on heroku and available here;
https://jobswap-server.herokuapp.com

To start simply;
node server.js

There are two services available...

findMatch (POST)
https://jobswap-server.herokuapp.com/findMatch
expecting the following body parameters;
name=bob&jobLocation=UK&jobSummary=anAgileJob!&search=Agile

allPeople (GET) - WIP
