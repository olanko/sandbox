var api = require('./challenge');

api.get('/campaigns')
.then(function(result) {
        console.log(result);
    })
    .fail(function(err) {
        console.log(err)
    });
;

api.post('/campaigns', {
  'name': 'Some campaign',
  'budget': 500
}).then(function(result) {
    console.log(result);
})
.fail(function(err) {
    console.log(err)
});

api.put('/campaigns/123', {
    'budget': 1000
}).then(function(result) {
    console.log(result);
})
.fail(function(err) {
    console.log(err)
});
