var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./challenge2.sqlite', sqlite3.OPEN_READONLY);


db.on('trace', function(sql) {
    console.log(sql);
});

var fs = require('fs');
var sql = fs.readFileSync('ads.sql', 'UTF8');

var sqlparams = {
    $begindate_i: '2013-09-01',
    $enddate_i: '2013-09-02',
    $begindate_o: '2013-09-01',
    $enddate_o: '2013-09-02'
};

//Hack to create SQL IN clause.
var ad_ids = [1, 2, 3, 999];
sql = sql.replace(/PARAM_IDS/g, ad_ids.join(', '));

db.serialize(function() {
    db.each(sql, sqlparams, function(err, row) {
        if (err) {
            throw err;
        };
        console.log(row);
    });

});

db.close();