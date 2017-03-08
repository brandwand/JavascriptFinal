var express = require('express'),
var bcrypt = require('bcrypt-nodejs'),
pug = require('pug'),
path = require('path'),
menu = require('./menu.json');
route = require('./routes/routes.js');
bodyParser = require('body-parser');
var mongoose = require('mongoose');





//Example from BCRIPT DEMO
/////////////////////////////////////////////////////////////
var hash;
bcrypt.hash("bacon", null, null, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    bcrypt.compare("bacon", hash, function (err, res) {
        console.log(res);
        // res == true
    });
    bcrypt.compare("veggies", hash, function (err, res) {
        // res = false
        console.log(res);
    });
});
//////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// Example from Burger Project
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function(req, res){
    res.render('index');
} );


 app.get('/:viewname', function(req, res){
     res.render(req.params.viewname, menu);
 });


app.get('/:viewname', function(req, res){
    res.render(req.params.viewname, menu);
});
////////////////////////////////////////////////////////////////////////////


app.listen(3000);