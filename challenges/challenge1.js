api = require('throttling-test');

api.get('/oakorshonen')
    .then(function(results) {
        console.log('results:', results);
    })
    .catch(function(err) {
        console.error('Error received:', err);
    });

// api.get('/campaigns').then(function(results) {
//   console.log('results:', results);
// }, function(error) {
//   console.error('Error received:', error);
// });