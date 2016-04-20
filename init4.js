var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myTestDB');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name : String,
    age : Number,
    DOB : Date,
    isAlive : Boolean
});

userSchema.methods.isYounger = function () {
    return this.model('User').age < 50 ? true : false;
}

var User = mongoose.model('User', userSchema);

var arvind = new User({
    name : 'Arvind',
    age : 99,
    DOB : '01/01/1915',
    isAlive : true
});

arvind.save(function (err, data) {
    if (err) console.log(err);
    else console.log('Saved ', data );
});

console.log('isYounger : ',arvind.isYounger());
