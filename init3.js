var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/test';
mongoose.connect(dbHost);


require('./schema.js')();

var Test = mongoose.model('Transaction');
var Person = mongoose.model('Person');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to DB");




/*

mongoose.connect('mongodb://localhost/persons', function(err) {
    if (err) {
        throw err;
    }

    Person.create({
        age: '',
        name: 1212,
        birthday: new Date().setFullYear((new Date().getFullYear() - 25))
    }, function(err, bill) {
        if (err) {
            throw err;
        }
        console.log('People added to db: %s', bill.toString());
        Person.find({}, function(err, people) {
            if (err) {
                throw err;
            }

            people.forEach(function(person) {
                console.log('People in the db: %s', person.toString());
            });

            // make sure to clean things up after we're done
            setTimeout(function() {
                cleanup();
            }, 2000);
        });
    });*/
});

function cleanup() {
    Person.remove(function() {
        mongoose.disconnect();
    });
}
