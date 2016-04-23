var mongo = require('mongodb');
var db = new mongo.Db('UAMS', new mongo.Server('localhost', 27017, {}), {});

//Empty Data
var businessEmptyData = {
    business_id: ' ',
    businessDescription: ' ',
    businessFirstName: ' ',
    businessLastName: ' ',
    businessAddress: ' ',
    businessState: ' ',
    businessCity: ' ',
    businessZip: ' ',
    businessPhone: ' ',
    businessEmail: ' ',
    businessWebsite: ' '
};

var customerEmptyData = {
    Customer_id: '',
    TRAMSPerson_id: '',
    CustomerFirstName: '',
    CustomerLastName: '',
    CustomerAddress: '',
    CustomerState: '',
    CustomerCity: '',
    CustomerZip: '',
    CustomerPhone: '',
    CustomerEmail: ''
};

var packageReservationEmptyData = {
    Reservation_id: '',
    customer_id: '',
    package_id: '',
    reservationDate: ''
};

var orderEmptyData = {
    order_id: '',
    product_id: ''
};

var serviceReservationEmptyData = {
    reservation_id: '',
    customer_id: '',
    service_id: '',
    reservationDate: ''
};

var packageEmptyData = {
    package_id: '',
    packageDescription: '',
    packagePrice: '',
    packageRequiredDeposit: ''
};

var productEmptyData = {
    product_id: '',
    productDescription: '',
    business_id: '',
    productPrice: ''
};

var serviceEmptyData = {
    service_id: '',
    serviceDescription: '',
    business_id: '',
    servicePrice: '',
    serviceRequiredDeposit: ''
};

var transactionEmptyData = {
    trans_id: '',
    transDate: ''
};

var billEmptyData = {
    bill_id: '',
    billType: '',
    billStatus: '',
    billAmount: ''
};

//End Empty Data

//TODO use mongoose node module for schema-based DB creation
function createDB() {
    db.open(function (err, db) {
        console.log('Opening connection to UAMS database...');
        var customerCollection = db.collection('CUSTOMER');
        var packageReservationCollection = db.collection('PACKAGE RESERVATION');
        var orderCollection = db.collection('ORDER');
        var serviceReservationCollection = db.collection('SERVICE RESERVATION');
        var packageCollection = db.collection('PACKAGE');
        var productCollection = db.collection('PRODUCT');
        var serviceCollection = db.collection('SERVICE');
        var businessCollection = db.collection('BUSINESS');
        var transactionCollection = db.collection('TRANSACTION');
        var billCollection = db.collection('BILL');

        console.log('Adding data to UAMS database...');
        createCollection(customerCollection, customerEmptyData).then(function () {
            createCollection(packageReservationCollection, packageReservationEmptyData).then(function () {
                createCollection(orderCollection, orderEmptyData).then(function () {
                    createCollection(serviceReservationCollection, serviceReservationEmptyData).then(function () {
                        createCollection(packageCollection, packageEmptyData).then(function () {
                            createCollection(productCollection, productEmptyData).then(function () {
                                createCollection(serviceCollection, serviceEmptyData).then(function () {
                                    createCollection(businessCollection, businessEmptyData).then(function () {
                                        createCollection(transactionCollection, transactionEmptyData).then(function () {
                                            createCollection(billCollection, billEmptyData).then(function () {
                                                db.close();
                                                console.log('UAMS database created successfully, connection closed');
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function createCollection(collection, data) {
    return collection.insert(data);
}




//Create everything
createDB();

