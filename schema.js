var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bulkSchema  = function(mongoose, conn) {
    var self = this;
//Design the mongoose.Schema
    self.businessmongoose.Schema = new mongoose.Schema({
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

    self.customermongoose.Schema = new mongoose.Schema({
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

    self.packageReservationmongoose.Schema = new mongoose.Schema({
        Reservation_id: Number,
        customer_id: Number,
        package_id: Number,
        reservationDate: Date
    });

    self.ordermongoose.Schema = new mongoose.Schema({
        order_id: Number,
        product_id: Number,
        productQuantity: Number
    });

    self.serviceReservationmongoose.Schema = new mongoose.Schema({
        reservation_id: Number,
        customer_id: Number,
        service_id: Number,
        reservationDate: Date
    });

    self.packagemongoose.Schema = new mongoose.Schema({
        package_id: Number,
        packageDescription: {type: String, required: true, trim: true},
        packagePrice: Number,
        packageRequiredDeposit: Number,
        businessID: Number
    });

    self.productmongoose.Schema = new mongoose.Schema({
        product_id: Number,
        productDescription: {type: String, required: true, trim: true},
        business_id: Number,
        productPrice: Number,
        productInventory: Number
    });

    self.servicemongoose.Schema = new mongoose.Schema({
        service_id: Number,
        serviceDescription: {type: String, required: true, trim: true},
        business_id: Number,
        servicePrice: Number,
        serviceRequiredDeposit: Number
    });

    self.transactionmongoose.Schema = new mongoose.Schema({
        trans_id: Number,
        transDate: {type: Date, default: Date.now}
    });

    self.billmongoose.Schema = new mongoose.Schema({
        bill_id: Number,
        billType: {type: String, required: true, trim: true},
        billStatus: {type: String, required: true, trim: true},
        billAmount: Number
    });

    self.Personmongoose.Schema = new mongoose.Schema({
        name: String,
        age: {type: Number, min: 18, index: true},
        birthday: Date
    });
};

modules.export = new bulkSchema;
//Okay here's the data, brace yourself...
