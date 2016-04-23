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
const sendTransactionToTRAMS = function (transID, customerID, transAmount) {
    var deferred = Q.defer();
    var trans;
    customerModel.findOne({customer_ID: customerID}, (err, prod) => {
        if (err) {
            console.error(`UAMS Insert ERROR: ${err}`);
            return deferred.resolve(null);
        }
        console.info(`TRAMS -> UAMS Insertion SUCCESS: Added ${prod} to the CUSTOMERS collection`);
        return prod.tramsPerson_id;
    }).then(function (tid) {
        transactionModel.find({trans_id: tid}, (err, prod) => {

            trans = prod;
        }).then(function () {
            return sql.connect(config).then(function () {
                return sql.query`select TOP 1 ReservationID from Reservation where PersonID = ${transID}`.then(function (rid) {
                    return sql.query`select TOP 1 FolioID from FOLIO where ReservationID = ${rid[0].ReservationID}`.then(function (fid) {
                        return sql.query`insert into FOLIOTRANSACTION (TransDate, TransAmount, TransDescription, FolioID) VALUES (${fid[0].transDate}, ${transAmount}, ${fid[0].transDescription}, ${fid[0].folioID}`.then(function (fid) {
                            console.info(`TRAMS -> UAMS Insertion SUCCESS: Added ${prod} to the CUSTOMERS collection`);

                            return deferred.resolve(res);
                        });
                    }).then(function () {
                        return deferred.promise;
                    });
                });
            });
        });
    });
};




sendTransactionToTRAMS(100019).then(function(res) {
    console.log('Found PersonID:' + res);
});