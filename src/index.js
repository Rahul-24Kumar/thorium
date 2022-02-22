const express = require('express');
var bodyParser = require('body-parser');

const route = require('./logger/route.js');
// if working on logger folder use ./logger/route.js
// if working on validator folder use  ./validator/route.js
// if working on util folder use  ./util/route.js

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
