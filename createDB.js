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


//TODO fix serviceRegistration and cust/biz addresses
//TODO think about making price a number instead
//TODO SQL connection

var packageReservationSchema = new Schema({
    reservation_id: Number,
    customer_id: Number,
    package_id: Number,
    reservationDate: Date
});

var orderSchema = new Schema({
    productQuantity: Number,
    product_id: Number,
    order_id: Number
});

var serviceReservationSchema = new Schema({
    reservation_id: Number,
    customer_id: Number,
    service_id: Number,
    reservationDate: Date
});

var packageSchema = new Schema({
    businessID: Number,
    packageRequiredDeposit: Number,
    packagePrice: {type: String, required: true, trim: true},
    packageDescription: {type: String, required: true, trim: true},
    package_id: Number
});

var productSchema = new Schema({
    productInventory: Number,
    productPrice: {type: String, required: true, trim: true},
    business_id: Number,
    productDescription: {type: String, required: true, trim: true},
    product_id: Number
});

var serviceSchema = new Schema({
    serviceRequiredDeposit: Number,
    servicePrice: {type: String, required: true, trim: true},
    business_id: Number,
    serviceDescription: {type: String, required: true, trim: true},
    service_id: Number
});

var transactionSchema = new Schema({
    transDate: {type: Date, default: Date.now},
    trans_id: Number
});

var billSchema = new Schema({
    billAmount: Number,
    billStatus: {type: String, required: true, trim: true},
    billType: {type: String, required: true, trim: true},
    bill_id: Number
});


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
