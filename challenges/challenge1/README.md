Simple API for rhttp request throttling.

Examples in apitest.js.

usage:

cat api = require('challenge.js');

api.get('/campaigns')
.then(function(result) {
        console.log(result);
    });
