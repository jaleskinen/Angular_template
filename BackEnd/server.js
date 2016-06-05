var express = require("express");
var path = require("path");

var https = require('https');
//var fs = require('fs');
var jwt = require('jsonwebtoken');

var bodyParser = require("body-parser");
//var database = require('./modules/database');
//var queries = require('./modules/queries');
//var person = require('./modules/person');
var user = require('./modules/user');
var mysql = require('./modules/mysql');

//This is used for createing a secret key value
//for our session cookie
var uuid = require('uuid');

//Create a secret for our web token
var secret = uuid.v1();

exports.secret = secret;

//This is used to create a session object for client
var session = require('express-session');

//var options = {
//    key: fs.readFileSync('server.key'),
//    cert: fs.readFileSync('server.crt'),
//    requestCert: false,
//    rejectUnauthorized: false
//};

var app = express();


app.set('port', 3000);
app.set('ip', "127.0.0.1");

//=====================Middlewares========================

app.use(session({
    secret: uuid.v1(),
    cookie: {maxAge: null} //set to null => cookie deleted after browser shut down
}));
//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Define middlewares for our static files (.html,.css, .js files that are loaded
//by browser when parsing index.html file)
app.use('/', express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css', express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib', express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module', express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers', express.static(path.join(__dirname, '../FrontEnd/controllers')));

app.use('/FrontEnd/factories', express.static(path.join(__dirname, '../FrontEnd/factories')));

app.use('/FrontEnd/fonts', express.static(path.join(__dirname, '../FrontEnd/fonts')));

//Take my own directives to use
app.use('/FrontEnd/directives', express.static(path.join(__dirname, '../FrontEnd/directives')));
app.use('/FrontEnd/views', express.static(path.join(__dirname, '../FrontEnd/views')));
console.log("server");
app.use('/users', user);

app.get('/logout', function (req, res) {
    
    req.session.destroy();
    res.redirect('/');
});

app.use(function (req, res, next) {
    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //Check if there was a token
    if(token){
        //Verify that token is not 'guessed' by the client and it matches
        //the one we created in login phase
        jwt.verify(token, secret, function(err, decoded) {
            //There was error verifying the token
            if(err) {
                
                return res.send(401);
            } else {
                
                req.decoded = decoded;
                console.log('decoded token: ' + req.decoded);
                next();
            }
        });
        
    } else {
        
        res.send(403);
    }
        
    });

//======OUR REST API MIDDLEWARES===============//
//app.use('/persons', person);
//=====================ROUTERS=================//

app.get('/islogged', function (req, res) {
    
    //User is logged if session contains kayttaja attribute
    if (req.session.kayttaja) {
        
        res.status(200).send([{status: 'Ok'}]);
    } else {
        
        res.status(401).send([{status: 'Unauthorized'}]);
    }
});

//https.createServer(options, app).listen(app.get('port'), app.get('ip'), function () {
//    console.log("Express server started");
//});

//Server side socket. Note there is only one socket in server
//that accepts ALL the client cnnections
//var io = require('socket.io').listen(https);

//listen "connection" message from client
//io.on('connection', function(socket){
//  console.log('a user connected');
//});

app.listen(3000);