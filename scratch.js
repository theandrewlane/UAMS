var sql = require('mssql');
var request = new sql.Request();

var config = {
    server: 'titan.cs.weber.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'Lane_TRAMS',
    user: 'AndrewLane',
    password: 'Android12',
    port: 10433
};
// Change the config settings to match your
// SQL Server and database


function executeQuery(id) {
    var con = new sql.Connection(config);
    var req = new sql.Request(con);

    sql.connect(config).then(function () {

        // con.connect(function (err) {
        // if (err) console.log(err);
        sql.query`select PersonID from Person where PersonFirst != ${id}`.then(function (recordset) {
            console.dir(JSON.stringify(recordset[1]));
        }).catch(function (err) {
            // ... query error checks
        });
    });
    //   });
}

executeQuery('test');

//sql.connect("mssql://AndrewLane:Android36@titan.cs.weber.edu:10433/Lane_TRAMS").then(function() {
// Que