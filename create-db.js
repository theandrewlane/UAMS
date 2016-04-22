const mongoose = require('mongoose');
const allDbData = require('./data/db-data.js');
const db = mongoose.connection;
const Schema = mongoose.Schema;
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
    reservation_id: Number,
    customer_id: Number,
    package_id: Number,
    reservationDate: Date
});

const orderSchema = new Schema({
    productQuantity: Number,
    product_id: Number,
    order_id: Number
});

const serviceReservationSchema = new Schema({
    reservation_id: Number,
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
    transDate: {type: Date, default: Date.now},
    trans_id: Number
});

const billSchema = new Schema({
    billAmount: Number,
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



//Define Functions
/*
 @param product_id - The ID of the product to update
 @param inventory - The number of inventory to be added to the current inventory
 */
const updateInventory = (prod_id, inventory) => {
    productModel.findOne({product_id: prod_id}, (err, prod) => {
        if (err) return console.log(err);
        prod.productInventory += inventory;
        prod.save(err => {
            if (err) return (err);
            console.info(`Successfully updated ProductID: ${prod_id}. Updated inventory is now: ${prod.productInventory}`);
        });
    });
};


const bulkArrayinsert = (index, callback) => models[index].insertMany(allDbData[data[index]], err => {
    if (err) console.log(`error !!!! ${err}`);
    console.info('Inserted all %s entries...', data[index]);
}).then(() => callback());

db.once('open', () => {
    console.log('connected, now do stuff!');
    return mongoose.connection.db.dropDatabase().then(() => {
        for (var i = 0; i < data.length; i++) {
            bulkArrayinsert(i);
        }
    });
    updateInventory(1002, 34);

});


