var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');

//Define connection attributes for mysql server
var connection = mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'friends_schema',
    multipleStatements: true
});

//Connect to mysql server with given connection attributes
connection.connect(function (err) {
    
    if (err) {
        console.log('could not connect to mysql server: ' + err.message);
    } else {
        
        console.log('Connected to mysql server:database friends_schema!');
    }
});

/*//Call this function to check username and password from mysql database
exports.loginMysql = function (req, res) {
    
    connection.query('SELECT * from user WHERE username = ? and pass = ?', [req.body.username, req.body.password], function (error, results, fields) {
        
        console.log(error);
        console.log(results);
        console.log(fields);
    });
    
};*/

//Call this function to check username and password from mysql database
exports.loginUser = function (req, res) {
    console.log('loginUser: ' + req.body.username, req.body.password);
    connection.query('CALL getLoginInfo (?, ?)', [req.body.username, req.body.password], function (error, results, fields) {
        
        if (error) {
           
            res.send(502, {status: error.message});
        } else {
            var test = results[0];
            if (test.length > 0) {
                
                req.session.kayttaja = test[0].username;
                //Create the token
                var token = jwt.sign(results, server.secret, {expiresIn: '2h'});
                res.send(200, {status: "Ok", secret: token});
            } else {
                
                res.send(401, {status: "Wrong username or password"});
            }
        }
    });
};

exports.registerNewUser = function (req, res) {
    console.log('username and password: ' + req.body.username, req.body.password);
    
    connection.query('CALL registerUser(?, ?)', [req.body.username, req.body.password], function (error, results, fields) {
        
        if (error) {
            
            res.status(500).send({status: error.message});
        } else {
            
            res.status(200).send({status: "Ok"});
        }
    });
};

/**
 *This function gets all friends for logged user
 */
exports.getPersonsForUserByUsername = function (req, res) {
    
    connection.query('CALL getFriendsByUsername(?)', [req.session.kayttaja], function (error, results, fields) {
        
        var data = results[0];
        if (results.length > 0) {
        
            res.send(data);
        } else {
            
            res.redirect('/');
        }
    });
};
