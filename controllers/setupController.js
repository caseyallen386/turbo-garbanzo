var fs = require('fs');
var path = require('path');
var express = require("express");
var setup = express.Router();
var Todos = require("../models/todoModel");

setup.get('/app', (req, res) => {
    

    res.render('setup');
});

setup.post('/api/app', (req, res) => {
    var configPath = path.resolve(__dirname, '../config');
    var configJson = configPath + '/config.json';

    if ( !fs.existsSync(configPath) ) {
      
        fs.mkdir(configPath, (err) => {
            if (err) console.log(err);
        });  
    } 

    fs.open(configJson, 'r+', (err, fd) => {
        
        res.sendStatus(fd);
        
    });

    
});

setup.post('/api/new-user', (req, res) => {
    console.log(req);
});

setup.post("/api/seedDB", function (req, res) {

    var hasData = false; 
    
    Todos.count({user : "test"}, function(err, count) {
        
        if (err) {
            console.log(err);
            res.send("Im sorry there was an error");
        }
        
        if (0 !== count) {
            hasData = true;
            console.log(hasData);
        }

    })
    // console.log(hasData);
    if (hasData) {
        res.send("Already Seeded Database");
        return;
    }

    var seedData = [
        {
            user : "test",
            task : "Buy Milk",
            isDone : false,
            hasAttachment : false
        },
        {
            user : "test",
            task : "Do Homework",
            isDone : false,
            hasAttachment : false
        },
        {
            user : "test",
            task : "Watch Netflix",
            isDone : false,
            hasAttachment : false
        }
    ];
    // Todos.create(seedData, function(err, results) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     res.send(results);
    // });

});

module.exports = setup;