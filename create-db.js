import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/UAMS2');
const db = mongoose.connection;

const Schema = mongoose.Schema;
import allDbData from './data/db-data.js';

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


//Create Models using schemas
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

//Define Functions

/*
 @param product_id - The ID of the product to update
 @param inventory - The number of inventory to be added to the current inventory
 */
const updateInventory = (prod_id, inventory/*, callback*/) => {
    productModel.findOne({product_id: prod_id}, (err, prod) => {
        if (err) {
            console.log(err);
            return;
        }
        prod.productInventory += inventory;
        prod.save(err => {
            if (err) {
                return (err);
            }
            console.info(
                `Successfully updated ProductID: ${prod_id}. Updated inventory is now: ${prod.productInventory}`
            );
            //return callback(err, prod);
        });

    });
};


//const collections = ['businesses', 'customers', 'packagesReservations', 'serviceReservations', 'orders', 'packages', 'products', 'services', 'transactions', 'bills'];
// const models = [business, customer, packagesReservation, serviceReservation, order, package, product, service, transaction, bill];


db.on('error', err => {
    console.log('connection error', err);
});
db.once('open', () => {
    console.log('connected, now do stuff!');

    //mongoose.connection.db.dropDatabase();


    businessModel.insertMany(allDbData.businessData, err => {
        if (err) {
            return console.log(`error !!!! ${err}`);
        }
        return console.info('Inserted all business entries...');
    });
    customerModel.insertMany(allDbData.customerData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all customer entries...');
    });

    packageReservationModel.insertMany(allDbData.packageReservationData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all package reservation entries...');
    });

    serviceReservationModel.insertMany(allDbData.serviceReservationData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all service reservation entries...');
    });

    orderModel.insertMany(allDbData.orderData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all order entries...');
    });

    packageModel.insertMany(allDbData.uaPackageData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all package entries...');
    });

    productModel.insertMany(allDbData.productData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all product entries...');
    });

    serviceModel.insertMany(allDbData.serviceData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all service entries...');
    });
    transactionModel.insertMany(allDbData.transactionData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all transaction entries...');
    });

    billModel.insertMany(allDbData.billData, err => {
        if (err) {
            return console.log(err);
        }
        return console.info('Inserted all bill entries...');
    });

    updateInventory(10011, 39);
    setTimeout(() => {
        console.log('Closing DB...');
        // return db.close(); //Don't close it if you're running functions from the terminal!
    }, 1450);

});
