const mongoose = require('mongoose');
const allDbData = require('./data/db-data.js');
const db = mongoose.connection;
const Schema = mongoose.Schema;
var sql = require('mssql');
var Q = require('q');

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


mongoose.connect('mongodb://localhost/UAMS');

//Error Handling
db.on('error', err => console.log('connection error', err));

//Construct Schemas
const businessSchema = new Schema({
    businessWebsite: {type: String, required: true, trim: true},
    businessEmail: {type: String, required: true, trim: true},
    businessPhone: {type: String, required: true, trim: true},
    businessAddress: {type: String, required: true, trim: true},
    businessZip: Number,
    businessCity: {type: String, required: true, trim: true},
    businessState: {type: String, required: true, trim: true},
    businessDescription: {type: String, required: true, trim: true},
    businessName: {type: String, required: true, trim: true},
    business_id: Number
});

const customerSchema = new Schema({
    customerEmail: {type: String, required: true, trim: true},
    customerAddress: {type: String, required: true, trim: true},
    customerPhone: {type: String, required: true, trim: true},
    customerZip: Number,
    customerCity: {type: String, required: true, trim: true},
    customerState: {type: String, required: true, trim: true},
    customerLastName: {type: String, required: true, trim: true},
    customerFirstName: {type: String, required: true, trim: true},
    tramsPerson_id: Number,
    customer_id: Number
});

const packageReservationSchema = new Schema({
    item_id: {type: String, required: true, trim: true},
    customer_id: Number,
    package_id: Number,
    reservationDate: Date
});

const orderSchema = new Schema({
    productQuantity: Number,
    product_id: Number,
    item_id: {type: String, required: true, trim: true}
});

const serviceReservationSchema = new Schema({
    item_id: {type: String, required: true, trim: true},
    customer_id: Number,
    service_id: Number,
    reservationDate: Date
});

const packageSchema = new Schema({
    businessID: Number,
    packageRequiredDeposit: Number,
    packagePrice: {type: String, required: true, trim: true},
    packageDescription: {type: String, required: true, trim: true},
    package_id: Number
});

const productSchema = new Schema({
    productInventory: Number,
    productPrice: {type: String, required: true, trim: true},
    business_id: Number,
    productDescription: {type: String, required: true, trim: true},
    product_id: Number
});

const serviceSchema = new Schema({
    serviceRequiredDeposit: Number,
    servicePrice: {type: String, required: true, trim: true},
    business_id: Number,
    serviceDescription: {type: String, required: true, trim: true},
    service_id: Number
});

const transactionSchema = new Schema({
    transDescription: {type: String, required: true, trim: true},
    bill_id: Number,
    transDate: {type: Date, default: Date.now},
    trans_id: {type: String, required: true, trim: true},
    amount: Number
});

const billSchema = new Schema({
    business_id: Number,
    customer_id: Number,
    billStatus: {type: String, required: true, trim: true},
    billType: {type: String, required: true, trim: true},
    bill_id: Number
});


//Create Models from Schemas
const businessModel = mongoose.model('Business', businessSchema);
const customerModel = mongoose.model('Customer', customerSchema);
const packageReservationModel = mongoose.model('PackageReservation', packageReservationSchema);
const serviceReservationModel = mongoose.model('ServiceReservation', serviceReservationSchema);
const orderModel = mongoose.model('Order', orderSchema);
const packageModel = mongoose.model('Package', packageSchema);
const productModel = mongoose.model('Product', productSchema);
const serviceModel = mongoose.model('Service', serviceSchema);
const transactionModel = mongoose.model('Transaction', transactionSchema);
const billModel = mongoose.model('Bill', billSchema);


//Helper Variables
const data = ['businessData', 'billData', 'customerData', 'orderData', 'packageReservationData', 'productData', 'serviceData', 'serviceReservationData', 'transactionData', 'uaPackageData'],
    models = [businessModel, billModel, customerModel, orderModel, packageReservationModel, productModel, serviceModel, serviceReservationModel, transactionModel, packageModel];

/**
 * Given a Product_ID, add/remove inventory related inventory
 *
 * @param {number} productID - The ID of the product to update
 *@param {number} inventory - The number of inventory to be added to the current inventory
 **/


const updateInventory = (productID, inventory) => {
    productModel.findOne({product_id: productID}, (err, prod) => {
        if (prod == null) return console.error(`Unable to update ProductID: ${productID}`);

        prod.productInventory += inventory;
        prod.save(err => {
            if (err) return (err);
            console.info(`Successfully updated ProductID: ${productID}. Updated inventory is now: ${prod.productInventory}`);
        });
    });
};


/**
 * Given a customer name (first last), produce a bill listing the transaction Ids, dates, count, amounts, status, and total due.
 *
 * @param {string} customer  - first last
 **/


const bulkArrayinsert = (index, callback) => models[index].insertMany(allDbData[data[index]], err => {
    if (err) console.log(`error !!!! ${err}`);
    console.info('Inserted all %s entries...', data[index]);
}).then(() => callback());

const produceCustomerBill = function (customer) {
    var fullName = customer.split(' ');
    var firstName = fullName[0];
    var lastName = fullName[fullName.length - 1];
    var query1 = customerModel.findOne({customerFirstName: firstName}, {customerLastName: lastName});
    var transTotal = [];
    query1.select('customer_id');
    query1.exec(function (err, person) {
        if (person == null) return console.error("ERROR producing bill - Please check customer name: " + customer);
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

db.once('open', () => {
    console.log('connected, now do stuff!');
    mongoose.connection.db.dropDatabase().then(() => {
        for (var i = 0; i < data.length; i++) {
            bulkArrayinsert(i);
        }
    });
    setTimeout(() => {
      //  updateInventory(1002, 34);
      //  produceCustomerBill('Gallegos Grant');
        console.log("data insertion successfull");

        db.close();
    }, 1450);

});


