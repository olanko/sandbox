var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./challenge2.sqlite', sqlite3.OPEN_READONLY);

// db.on('trace', function(sql) {
//     console.log(sql);
// });

var fs = require('fs');
var sqlfile = fs.readFileSync('ads.sql', 'UTF8');

//Simple express REST API for GET
var express = require('express');
var app = express();

app.get('/api/stats', function(req, res){
    var sqlparams = {
        //Little hack with named parameters so that inner query
        //has its own date range.
        $begindate_i: req.query['start_time'] || '2013-09-01',
        $enddate_i: req.query['end_time'] || '2013-10-01',
        $begindate_o: req.query['start_time'] || '2013-09-01',
        $enddate_o: req.query['end_time'] || '2013-10-01'
    };

    //Hack to create SQL IN clause.
    var ad_ids = [1];
    if (req.query['ad_ids']) {
        ad_ids = req.query['ad_ids'].split(',').map(Number);
    }
    sql = sqlfile.replace(/PARAM_IDS/g, ad_ids.join(', '));

    db.serialize(function() {
        db.all(sql, sqlparams, function(err, rows) {
            if (err) {
                throw err;
            };

            var result = {};
            for (var i = 0; i < rows.length; i++) {
                var r = rows[i];
                if(!result[r.ad_id]) {
                    result[r.ad_id] = {
                        'impressions': r.impressions,
                        'clicks': r.clicks,
                        'spent': r.spent,
                        'ctr': r.ctr,
                        'cpc': r.cpc,
                        'cpm': r.cpm,
                        'actions': {}
                    };
                }

                result[r.ad_id]['actions'][r.action] = {
                    'count': r.count,
                    'value': r.value,
                    'cpa': r.cpa
                };
            };

            res.write(JSON.stringify(result));
            res.end();
        });
    });
});

app.listen(8080);
console.log('Listening port 8080');
app.on('close', function() {
    console.log('close db');
    db.close();
});
