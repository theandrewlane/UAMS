'use strict';

//TODO export this and import it into ../create-db.js

/**
 *-    FUNCTION Name: customerExistsInTrams()
 -    FUNCTION Description: Given a customer’s name <first last> check whether or not they exist in the TRAMS Person table.
 -    Input Parameter: customerName (String) – The customer’s name <first last>
 -    Returns: The TRAMS PersonID if the customer exists in the database, otherwise this will return null;*
 **/
const customerExistsInTrams = function (firstName, lastName) {

    var _ = require('underscore');
    var Q = require('q');
    var sql = require('mssql');
    var config = {
        server: 'titan.cs.weber.edu',
        database: 'Lane_TRAMS',
        user: 'AndrewLane',
        password: 'Android12',
        port: 10433,
        parseJson: true,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    };

//TODO think about a sql.connect helper function
    var deferred = Q.defer();
    return sql.connect(config).then(function () {
        sql.query`select TOP 1 * from Person where PersonFirst = ${firstName} AND PersonLast = ${lastName}`.then(function (res) {
            if (res.length < 1) {
                console.error(`TRAMS QUERY ERROR: ${firstName}, ${lastName} was not found in the TRAMS database!`);
                deferred.reject(null);
            } else {
                res = res[0].PersonID;
                console.info(`TRAMS QUERY SUCCESS: ${firstName}, ${lastName} (PersonID:${res}) was found in the TRAMS database!`);
                deferred.resolve(res);
            }

        }).catch(function (err) {
            console.error(`TRAMS undefined error ${err} please try again later`);
        });
    }).then(function () {
        sql.close();
        return deferred.promise;
    });
};


//Test it
customerExistsInTrams(12323, 11);
