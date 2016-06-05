//var query = require('./queries');
var mysql = require('./mysql');
/**
  *This file is a router for User resource
  *Version:0.0.1
  *Author:Jarmo Leskinen
  *Description:Created this new file
  */

var express = require("express");

var router = express.Router();

//This router handles a request to ??
router.get('/', function (req, res) {
    
    mysql.getPersonsForUserByUsername(req, res);
});

//This router handles a request to login
router.post('/login', function (req, res) {
    
    console.log("loginUser router");
    mysql.loginUser(req, res);
});

//This router handles a request to register
router.post('/register', function (req, res) {
    
    console.log("registerNewUser router");
    mysql.registerNewUser(req, res);
});

module.exports = router;