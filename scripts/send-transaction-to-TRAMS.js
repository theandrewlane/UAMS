'use strict';

//TODO export this and import it into ../create-db.js

/**
-	FUNCTION Name: sendTransactionToTRAMS()
-	FUNCTION Description: If a customer exists in TRAMS and has a FOLIO, create a new FOLIOTransaction for that customer containing all the details from the transaction. Remove the transaction from the UAMS database.
-	Input Parameter: trans_id (integer), customer(id)
-	Returns: The TRAMS TransID and the TRAMS FolioID, along with a success message.
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

//TODO make transaction

const sendTransactionToTRAMS = function(transID, customerID) {

    var deferred = Q.defer();
    mongoose.connect('mongodb://localhost/UAMS');
    const db = mongoose.connection;
    db.on('error', err => console.error('connection error', err));
    db.once('open', () => {
        customerModel.findOne({customer_ID: customerID}, (err, prod) => {
                if (err) {
                console.error(`UAMS Insert ERROR: ${err}`);
              //  return deferred.resolve(null);
            }
            console.info(`TRAMS -> UAMS Insertion SUCCESS: Added ${prod[0]} to the CUSTOMERS collection`);
           // return deferred.resolve(prod);
        });

    });
    //return deferred.promise;

/*    return sql.connect(config).then(function() {
        /!*     var request = new sql.Request();
         request.query('inser').then(function(recordset) {
         console.log(request.rowsAffected);
         });*!/

        sql.query`select TOP 1 ReservationID from Reservation where PersonID = ${personid}`.then(function(res) {

        }
        sql.query`insert into  ReservationID from Reservation where PersonID = ${personid}`.then(function(res) {
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
    });*/
};




sendTransactionToTRAMS(100019).then(function(res) {
    console.log('Found PersonID:' + res);
});