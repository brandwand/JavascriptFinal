var express = require('express'),
    bcrypt = require('bcrypt-nodejs'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    cookie = require('cookie-sessions'),
    sessions = require('express-sessions');

//Example from BCRIPT DEMO
/////////////////////////////////////////////////////////////
// var hash;
// bcrypt.hash("bacon", null, null, function (err, hash) {
//     // Store hash in your password DB.
//     console.log(hash);
//     bcrypt.compare("psw", hash, function (err, res) {
//         console.log(res);
//         // res == true
//     });
//     bcrypt.compare("bacon", hash, function (err, res) {
//         // res = false
//         console.log(res);
//     });
// });
//////////////////////////////////////////////////////////////
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
var urlencodedParser = bodyParser.urlencoded({ extended: true});
app.get('/', route.index);
app.get('/create', route.create);
app.get('/edit/:id', route.edit);
app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, route.createPerson);
app.post('/edit/:id', urlencodedParser, route.editPerson);
app.get('/delete/:id', route.delete);
 
// app.get('/', function(req, res){
//     res.render('index');
// } );

//  app.get('/:viewname', function(req, res){
//      res.render(req.params.viewname);
//  });

app.listen(3000);