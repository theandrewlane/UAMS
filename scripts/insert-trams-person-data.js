'use strict';

//TODO export this and import it into ../create-db.js

/**
 -    Function Name: addUltimateDiscount (called via trigger when transaction is added to bill)
 -    Function Description: This function is designed to be called if getTramsVacations returns an int greater than zero. If the return value of getTramsVacations is less than 2, reduce bill amount by 5%. If the return value is greater than 2, reduce the bill amount by 10%.
 -    Input Parameter: Vacations (int) – The amount of TRAMS vacations
 -    Returns: Boolean on successful bill update.
 **/

var _ = require('underscore');
const mongoose = require('mongoose');
/*var autoIncrement = require('mongoose-auto-increment');
 var connection = mongoose.createConnection("mongodb://localhost/myDatabase");*/
//autoIncrement.initialize(connection);

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

const InsertTRAMSPersonData = function(tramsPID) {
    var deferred = Q.defer();
    return sql.connect(config).then(function() {
        sql.query`select TOP 1 * from Person where PersonID = ${tramsPID}`.then(function(res) {
            if (res.length < 1) {
                console.error(`TRAMS QUERY ERROR: PersonID:${tramsPID} was not found in the TRAMS database!`);
            } else {
                mongoose.connect('mongodb://localhost/UAMS');
                const db = mongoose.connection;
                db.on('error', err => console.error('connection error', err));
                db.once('open', () => {
                    db.collection('customers').insertOne({
                        customerEmail: res[0].PersonEmail,
                        customerAddress: res[0].PersonAddress,
                        customerPhone: res[0].PersonPhone,
                        customerZip: res[0].PersonPostalCode,
                        customerCity: res[0].PersonCity,
                        customerState: res[0].PersonState,
                        customerLastName: res[0].PersonLast,
                        customerFirstName: res[0].PersonFirst,
                        tramsPerson_id: res[0].PersonID
                    }, function(err) {
                        if (err) {
                            console.error(`UAMS Insert ERROR: ${err}`);
                            return deferred.resolve(null);
                        }
                        console.info(`TRAMS -> UAMS Insertion SUCCESS: Added ${res[0].PersonFirst} ${res[0].PersonLast} to the CUSTOMERS collection`);
                        return deferred.resolve(res);
                    });
                });
            }
        });
    }).then(function() {
        return deferred.promise;
    });
    return sql.close();
};

InsertTRAMSPersonData(40).then(function(res) {
    console.log('Found PersonID:' + res);
});
