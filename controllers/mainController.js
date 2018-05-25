var express = require("express");
var routes = express.Router();
var config = require('../config');

routes.get("/", function(req, res) {
    res.render("index");
});

routes.get('/logout', (req, res) => {
    req.logOut();

    res.render('logout');
});

module.exports = routes;