var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var personSchema = mongoose.Schema({
    name: String,
    age: String,
    email: String,
    username: String,
    password: String,
    userLevel: String
});


var Person = mongoose.model('People_Collection', personSchema);



exports.index = function (req, res) {
    Person.find(function (err, person) {
        if (err) return console.error(err);
        res.render('index', { title: 'People List', people: person });
    });
};

exports.create = function (req, res) {
    res.render('create');
};

exports.createPerson = function (req, res) {
    var person = new Person({ name: req.body.name, age: req.body.age, email: req.body.email, username: req.body.username, password: req.body.password, userLevel: req.body.userLevel });
    person.save(function (err, person) {
        if (err) return console.error(err);
        console.log(req.body.name + ' added');
    });
    res.redirect('/');
};

exports.edit = function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (err) return console.error(err);
        res.render('edit', { person: person });
    });
};

exports.editPerson = function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (err) return console.error(err);
        person.name = req.body.name;
        person.age = req.body.age;
        person.username = req.body.username;
        person.password = req.body.password;
        person.userLevel = req.body.userLevel;
        person.save(function (err, person) {
            if (err) return console.error(err);
            console.log(req.body.name + ' updated');
        });
    });
    res.redirect('/');

};

exports.delete = function (req, res) {
    Person.findByIdAndRemove(req.params.id, function (err, person) {
        if (err) return console.error(err);
        res.redirect('/');
    });
};

exports.details = function (req, res) {
    Person.findById(req.params.id, function (err, person) {
        if (err) return console.error(err);
        res.render('details', { title: 'People List', person: person });
    });
};