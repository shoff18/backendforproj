var http = require('http');
var util = require('util');
var qs = require('querystring');
var mysql = require('mysql');

var dbObject = null;
//var dbHost = "mongodb://cnstat:afrobarom@ds159220.mlab.com:59220/afrobarometer-data"

var con = mysql.createConnection({
    host: '35.193.95.180',
    user: 'root',
    password: 'ym2M4v0kqxlGjd6D',
    database: 'afrodemo'
});



con.connect(function (err, database) {
    if (err) throw err;
    console.log("connected");
    dbObject = database;
});

http.createServer(function (req, res) {
    console.log('Request received');
    var queryData;
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' // implementation of CORS
    });
    if (req.method == 'POST') {
        var message = '';
        req.on('data', function (chunk) {
            console.log('GOT DATA!');
            var data = JSON.parse(chunk)
            console.log(data);
            
            console.log(data.collection);     

         
            con.query(('select * from ' + data.collection), function (err, result, fields) {
                var queststring = 'select * from questions where data_table_name = "' + data.collection + '"';
                con.query((queststring), function (err, result2, fields2) {
                    console.log(result2);
                    result = result.concat(result2);
                    console.log(JSON.stringify(result));
                res.end(JSON.stringify(result));
               
                });

                    


            });

        });
    }
}).listen(8080, '127.0.0.1');
console.log('Server running at http://172.21.109.11:8080/');
//console.log('Server running at http://192.168.1.19:8080/');
//vm at 35.231.167.160 