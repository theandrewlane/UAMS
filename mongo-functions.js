var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var baseSchema = require('./schema.js')();


//Export schema and functions
module.exports = function () {
    var self = this;

    self.businessmongoose = model('Business', baseSchema.businessSchema);
    self.customermongoose = model('Customer', customerSchema);
    self.packageReservation = mongoose.model('PackageReservation', packageReservationSchema);
    self.serviceReservation = mongoose.model('ServiceReservation', serviceReservationSchema);
    self.order = mongoose.model('Order', orderSchema);
    self.package = mongoose.model('Package', packageSchema);
    self.product = mongoose.model('Product', productSchema);
    self.service = mongoose.model('Service', serviceSchema);
    self.transaction = mongoose.model('Transaction', transactionSchema);
    self.bill = mongoose.model('Bill', billSchema);

    //Businesses can update product inventory. Orders can update product inventory.
    self.updateInventory = function (amount, productID) {
        //Update ProductQuantity in the product schema
        //Throw error if productID doesn't exist

        // product.update()
    };

    /*
     * Customers vacationing at an “ultimate” property, receive a 5% discount.
     * Customers vacationing at an “ultimate” property who have booked with UA more than twice receive a 10% discount.
     */
    self.addUltimateDiscount = function (amount, productID) {
        //call self.getTramsVacations
        //If promise resolves to a number greater than one, update total by subtracting 5%
        //bill.update()
        //If promise resolves to a number greater than one, update total by subtracting 10%
        //bill.update()
        //If promise resolves to a number less than one, write "no discount" to console.
        //Update ProductQuantity in the product schema
        //Throw error if productID doesn't exist
    };

    //Helper function for addUltimateDiscount
    self.getTramsVacations = function (personID) {
        //Connect to trams
        //Execute query against reservation table where personID = CustomerID
        //Return the count of occurences
    };


    //Customers can view their bills
    self.produceCustomerBill = function (customerID, orderID) {
        //If an orderID is specified don't follow steps below, just return the bill

        //given a customerId, check for a service or package reservation
        //If multiple results exist, use the one with the most recent reservation date

        //Log bill to console
    };


    //Customers that exist in the TRAMS database
    //can opt to have their customer information copied over to the Customer Table.
    self.InsertTRAMSPerson = function (businessID) {
        //Connect to trams
        //Grab all corresponding information from PERSON, and insert into CUSTOMER.
        //Throw error if PersonID doesn't exist
    };


    //If the reservation is cancelled within 24 hours of booking, the deposit is refunded. I
    // f the reservation is cancelled outside of the 24-hour window they do not get their deposit back

    self.RefundDeposit = function (reservationID) {
        //Check the entry date of the package or service reservation
        //If entry date < date.getDate() - 24 hours don't create refund transaction
        //Otherwise create refund transaction.
    };

    //The system can create transactions when necessary
    self.createTransaction = function (billID, billAmount, billTyoe, billDescription) {
        //If the billID exists, create a new transaction with the following parameters
        //If billID doesn't exist throw error
    };


//More Triggers TODO

    function getPrice(num) {
        return (num / 100).toFixed(2);
    }

    function setPrice(num) {
        return num * 100;
    }
}
;