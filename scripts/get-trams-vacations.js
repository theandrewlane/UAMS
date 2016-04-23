'use strict';

//TODO export this and import it into ../create-db.js

/**
 -    FUNCTION Name: getTramsVacations()
 -    FUNCTION Description: This function queries TRAMS – Given the PersonID, this function will count the occurrences in the reservation table. This function also relies on the helper function customerExistsInTrams(). If this function doesn’t return a PersonID, getTramsVacations() will log an error.
 -    Input Parameter: PersonID (int) – The TRAMS PersonID
 -    Returns: An Integer representation which reflects the Customer’s total amount of TRAMS vacations.
 **/




'use strict';

//TODO export this and import it into ../create-db.js

/**
 Function Description: This function queries TRAMS – Given the PersonID, this function will count the occurrences in the reservation table. This function also relies on the helper function customerExistsInTrams(). If this function doesn’t return a PersonID, getTramsVacations() will log an error.
 Input Parameter: PersonID (integer) – The TRAMS PersonID
 Returns: An Integer representation which reflects the Customer’s total amount of TRAMS vacations.
 **/

var _ = require('underscore');
const mongoose = require('mongoose');

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

const getTramsVacations = function(personid) {
    var deferred = Q.defer();
    return sql.connect(config).then(function() {
        sql.query`select ReservationID from Reservation where PersonID = ${personid}`.then(function(res) {
            if (res.length < 1) {
                console.error(`TRAMS QUERY ERROR: PersonID:${personid} does not have any listed reservations in the TRAMS database`);
                deferred.resolve(res.length);
            } else {
                console.info(`TRAMS QUERY SUCCESS:PersonID:${personid}) was found in the TRAMS database, and has ${res.length} vacation(s)!`);
                deferred.resolve(res.length);
            }

        }).catch(function(err) {
            console.error(`TRAMS QUERY SYNTAX/PERSISTENCE ERROR: ${err} please try again later`);
        });
    }).then(function() {
        sql.close();
        return deferred.promise;
    });
};

getTramsVacations(4330).then(function(res) {
    console.log('Found PersonID:' + res);
});
