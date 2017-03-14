var express = require('express'),
    bcrypt = require('bcrypt-nodejs'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    cookie = require('cookie-parser'),
    sessions = require('express-session');


var app = express();
var dateCookie = "";
// app.get('/:viewname', function (req, res) {
//     res.render(req.params.viewname);
// });

var checkAuth = function (req, res, next) {
    if (req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/adminView');
    }
};
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(sessions({secret: '5ecretP455c0de', saveUninitialized: true, resave: true}));

app.get('/login', route.login);

app.get('/adminView', checkAuth, function (req, res) {
    res.send('Authorized access: Welcome ' + req.session.user.username + '<br><a href="/logout">Logout</a');
});

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

app.use(express.static(path.join(__dirname + '/public')));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get('/', function (req, res){
    if(req.cookies.dateCookie != ""){
        res.send('Time page was last visited: ' + dateCookie);
    } else{
        dateCookie = Date().toUTCString();
        res.cookie('timeLastVisited', dateCookie);
        res.send('Welcome new user.');
    }
})
app.get('/', route.index);
app.get('/index', route.index);
app.get('/create', route.create);
app.get('/edit/:id', route.edit);
app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, route.createPerson);
app.post('/edit/:id', urlencodedParser, route.editPerson);
app.get('/delete/:id', route.delete);
app.get('/adminView', checkAuth, route.adminView);
app.get('/userView', checkAuth, route.userView);
app.get('/questions/', route.questions);

app.post('/login', urlencodedParser, function (req, res) {
    console.log(req.body.username);
    if (req.body.username == 'admin' && req.body.password == 'pass') {
        req.session.user = { isAuthenticated: true, username: req.body.username};
        res.redirect('/adminView');

    } else {
        // logout here so if the user was logged in before, it will log them out if user/pass wrong
        res.redirect('/logout');
    }
});



//Example from BCRIPT DEMO
/////////////////////////////////////////////////////////////
// var hash;
// bcrypt.hash(username, null, null, function (err, hash) {
//     // Store hash in your password DB.
//     console.log(hash);
//     bcrypt.compare(password, hash, function (err, res) {
//         console.log(res);
//         // res == true
//     });
//     bcrypt.compare(username, hash, function (err, res) {
//         // res = false
//         console.log(res);
//     });
// });
//////////////////////////////////////////////////////////////
// app.use(cookieParser());
// app.use(sessions({secret: 'This is my secret', saveUninitialized: true, resave: true}));

// app.get('/', function (req, res) {
//     req.session.name = req.session.name || new Date().toUTCString();
//     console.log(req.sessionID);
//     res.send(req.session.name);
// });

app.listen(3000);