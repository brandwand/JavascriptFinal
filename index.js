var express = require('express');
var bcrypt = require('bcrypt-nodejs');
var pug = require('pug');
var path = require('path');
var route = require('./routes/routes.js');
var bodyParser = require('body-parser');
var cookie = require('cookie-sessions');
var sessions = require('express-sessions');





//Example from BCRIPT DEMO
/////////////////////////////////////////////////////////////
var hash;
bcrypt.hash("bacon", null, null, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    bcrypt.compare("psw", hash, function (err, res) {
        console.log(res);
        // res == true
    });
    bcrypt.compare("bacon", hash, function (err, res) {
        // res = false
        console.log(res);
    });
});
//////////////////////////////////////////////////////////////
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function(req, res){
    res.render('index');
} );


 app.get('/:viewname', function(req, res){
     res.render(req.params.viewname);
 });

app.listen(3000);