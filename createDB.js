var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UAMS2');
var db = mongoose.connection;

var Schema = mongoose.Schema;
var allDbData = require('./data/allData2.js');

var businessSchema = new Schema({
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

var customerSchema = new Schema({
    customer_id: Number,
    TRAMSPerson_id: Number,
    CustomerFirstName: {type: String, required: true, trim: true},
    CustomerLastName: {type: String, required: true, trim: true},
    CustomerAddress: {type: String, required: true, trim: true},
    CustomerState: {type: String, required: true, trim: true},
    CustomerCity: {type: String, required: true, trim: true},
    CustomerZip: Number,
    CustomerPhone: Number,
    CustomerEmail: {type: String, required: true, trim: true}
});

var packageReservationSchema = new Schema({
    Reservation_id: Number,
    customer_id: Number,
    package_id: Number,
    reservationDate: Date
});

var orderSchema = new Schema({
    order_id: Number,
    product_id: Number,
    productQuantity: Number
});

var serviceReservationSchema = new Schema({
    reservation_id: Number,
    customer_id: Number,
    service_id: Number,
    reservationDate: Date
});

var packageSchema = new Schema({
    package_id: Number,
    packageDescription: {type: String, required: true, trim: true},
    packagePrice: Number,
    packageRequiredDeposit: Number,
    businessID: Number
});

var productSchema = new Schema({
    product_id: Number,
    productDescription: {type: String, required: true, trim: true},
    business_id: Number,
    productPrice: Number,
    productInventory: Number
});

var serviceSchema = new Schema({
    service_id: Number,
    serviceDescription: {type: String, required: true, trim: true},
    business_id: Number,
    servicePrice: Number,
    serviceRequiredDeposit: Number
});

var transactionSchema = new Schema({
    trans_id: Number,
    transDate: {type: Date, default: Date.now}
});

var billSchema = new Schema({
    bill_id: Number,
    billType: {type: String, required: true, trim: true},
    billStatus: {type: String, required: true, trim: true},
    billAmount: Number
});

var PersonSchema = new Schema({
    name: String,
    age: {type: Number, min: 18, index: true},
    birthday: Date
});

//Create Models from schema
var biz = [
    {
        'businessWebsite': 'http://www.MAKINGWAY.info',
        'businessEmail': 'support@makingway.com',
        'businessPhone': '+1 (900) 483-2113',
        'businessAddress': '136 Williams Place Winfred, North Carolina 14522',
        'businessZip': 14522,
        'businessCity': 'Winfred',
        'businessState': 'North Carolina',
        'businessDescription': 'Commodo laborum tempor pariatur nostrud enim pariatur ea proident minim pariatur.',
        'businessName': 'MAKINGWAY',
        'business_id': 0
    },
    {
        'businessWebsite': 'http://www.COMFIRM.ca',
        'businessEmail': 'support@comfirm.biz',
        'businessPhone': '+1 (946) 571-2529',
        'businessAddress': '953 Kansas Place Ernstville, American Samoa 22765',
        'businessZip': 22765,
        'businessCity': 'Ernstville',
        'businessState': 'American Samoa',
        'businessDescription': 'Occaecat reprehenderit ullamco ea do veniam culpa minim voluptate pariatur reprehenderit eu ex deserunt.',
        'businessName': 'COMFIRM',
        'business_id': 1
    }];

db.on('error', function(err) {
    console.log('connection error', err);
});
db.once('open', function() {
    console.log('connected, now do stuff!');
    var bizmodel = mongoose.model('Business', businessSchema);
    mongoose.model('Customer', customerSchema);
    mongoose.model('PackageReservation', packageReservationSchema);
    mongoose.model('ServiceReservation', serviceReservationSchema);
    mongoose.model('Order', orderSchema);
    mongoose.model('Package', packageSchema);
    mongoose.model('Product', productSchema);
    mongoose.model('Service', serviceSchema);
    mongoose.model('Transaction', transactionSchema);
    mongoose.model('Bill', billSchema);

    //    mongoose.connection.db.dropDatabase();

    /*    for (var i in mongoose.connection.collections) {

     console.log( mongoose.connection.collections[i]);
     }*/

    bizmodel.insertMany(allDbData.businessData, function(error, docs) {});
/*    bizmodel.insertMany(biz)
        .then(function(docs) {
            console.log(docs);
            /!* ... *!/
        })
        .catch(function(err) {
            console.log(err);
            /!* Error handling *!/
        });*/

   /* bizmodel.collection.insert(biz, onInsert, { ordered: false });
    function onInsert(err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.info(docs.length);
        }
    }*/
    /*  bizmodel.create(biz, function(err) {
          if (err) console.log(err);
      });*/

    //mongoose.connection.collections[0].insert(biz);

    // var collections = ['businesses', 'customers', 'packagesReservations', 'serviceReservations', 'orders', 'packages', 'products', 'services', 'transactions', 'bills'];
    // var models = [business, customer, packagesReservation, serviceReservation, order, package, product, service, transaction, bill];

    //Drop Tables
    /*collections.forEach(function (collection) {
     mongoose.connection.db.dropCollection(collection, function (err, res) {
     console.log(res);
     });

     });*/

    // console.log(allSchema.businessSchema);
    /*     business.create(allDbData.businessData, function (err, r) {
     //assert.equal(null, err);
     console.log(r);
     //db.close();
     });*/
    db.close();
});
