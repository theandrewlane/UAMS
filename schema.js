var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Export schema and functions
module.exports = function () {

//Design the schema
    var businessSchema = new Schema({
        business_id: Number,
        businessDescription: {type: String, required: true, trim: true},
        businessFirstName: {type: String, required: true, trim: true},
        businessLastName: {type: String, required: true, trim: true},
        businessAddress: {type: String, required: true, trim: true},
        businessState: {type: String, required: true, trim: true},
        businessCity: {type: String, required: true, trim: true},
        businessZip: Number,
        businessPhone: Number,
        businessEmail: {type: String, required: true, trim: true},
        businessWebsite: {type: String, required: true, trim: true}
    });

    var customerSchema = new Schema({
        Customer_id: Number,
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
        product_id: Number
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
        packagePrice: {type: Number, get: getPrice, set: setPrice},
        packageRequiredDeposit: {type: Number, get: getPrice, set: setPrice}
    });

    var productSchema = new Schema({
        product_id: Number,
        productDescription: {type: String, required: true, trim: true},
        business_id: Number,
        productPrice: {type: Number, get: getPrice, set: setPrice}
    });

    var serviceSchema = new Schema({
        service_id: Number,
        serviceDescription: {type: String, required: true, trim: true},
        business_id: Number,
        servicePrice: {type: Number, get: getPrice, set: setPrice},
        serviceRequiredDeposit: {type: Number, get: getPrice, set: setPrice}
    });

    var transactionSchema = new Schema({
        trans_id: Number,
        transDate: {type: Date, default: Date.now}
    });

    var billSchema = new Schema({
        bill_id: Number,
        billType: {type: String, required: true, trim: true},
        billStatus: {type: String, required: true, trim: true},
        billAmount: {type: Number, get: getPrice, set: setPrice}
    });

    var PersonSchema = new Schema({
        name: String,
        age: { type: Number, min: 18, index: true },
        birthday: Date
    });
    mongoose.model('Person', PersonSchema);

    //Create Models from schema
    mongoose.model('Business', businessSchema);
    mongoose.model('Customer', customerSchema);
    mongoose.model('PackageReservation', packageReservationSchema);
    mongoose.model('ServiceReservation', serviceReservationSchema);
    mongoose.model('Order', orderSchema);
    mongoose.model('Package', packageSchema);
    mongoose.model('Product', productSchema);
    mongoose.model('Service', serviceSchema);
    mongoose.model('Transaction', transactionSchema);
    mongoose.model('Bill', billSchema);


    //TODO triggers here - example res date must be >= today

    function getPrice(num) {
        return (num / 100).toFixed(2);
    }

    function setPrice(num) {
        return num * 100;
    }
};