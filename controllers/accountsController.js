var express = require("express");
var routes = express.Router();
var mongoose  = require('mongoose');
var User = require("../models/usersModel");

routes.get("/", function(req, res) {
    res.redirect("/account/my-account");
});

routes.get('/my-account', (req, res) => {
    if (!req.user) res.redirect('/login');

    res.render('my-account', req.user);
});

module.exports = routes;