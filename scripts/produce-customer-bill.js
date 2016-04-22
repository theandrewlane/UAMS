'use strict';

/**
 -    Function Name: produceCustomerBill()
 -    Function Description: Given a customer’s name <first last> , produce a bill (in stdout) listing the the customer details, transaction count, transaction details, and the total amount due.
 -    Input Parameter: customerName (String) – The customer’s name <first last>
 -    Returns: The customer’s bill, via console output.

 **/
const produceCustomerBill = function (customer) {
    var fullName = customer.split(' ');
    var firstName = fullName[0];
    var lastName = fullName[fullName.length - 1];
    var query1 = customerModel.findOne({customerFirstName: firstName}, {customerLastName: lastName});
    var transTotal = [];
    query1.select('customer_id');
    query1.exec(function (err, person) {
        if (err) return handleError(err);
        console.info('------------------Generating Bill For: ' + lastName + ', ' + firstName + ' ------------------\nCustomerId: ' + person.customer_id);
        return person.customer_id;
    }).then(function (res) {
        var query2 = billModel.findOne({customer_id: res.customer_id});
        query2.select('bill_id billStatus');
        query2.exec(function (err, bid) {
            if (err) return handleError(err);
            console.info('\nBill ID: ' + bid.bill_id + '\nBill Status: ' + bid.billStatus);
            return bid;
        }).then(function (res2) {
            var query3 = transactionModel.find({bill_id: res2.bill_id});
            query3.select('trans_id transDate transDescription amount');
            query3.exec(function (err, trans) {
                console.info('\nTransaction Count: ' + trans.length);
                trans.forEach(function (tran) {
                    transTotal.push(tran.amount);
                    console.info('TransID: ' + tran.trans_id + '\t' + tran.transDate + '\t$' + tran.amount);
                });
                console.log('Total Amount due: $' + transTotal.reduce((a, b) => a + b, 0));
                console.log('------------------------------------------------------------------------');
            });
        });
    });
};