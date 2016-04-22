var sql = require('mssql');
var config = {
    server: 'titan.cs.weber.edu',
    database: 'Lane_TRAMS',
    user: 'AndrewLane',
    password: 'Android12',
    port: 10433
};

function executeQuery(id) {
    sql.connect(config).then(function() {
        sql.query`select PersonID from Person where PersonFirst != ${id}`.then(function(recordset) {
            console.dir(JSON.stringify(recordset[1]));
        }).catch(function() {
            // ... query error checks
        });
    });
}

executeQuery('test');
