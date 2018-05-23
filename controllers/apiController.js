var express = require("express");
var routes = express.Router();
var Todos = require("../models/todoModel");

routes.get("/todos/user/:user", function(req, res) {
    Todos.find({user : req.params.user}, "user task isDone hasAttachment", function(err, todos) {
        res.send(todos);
    });
});

routes.get("/todos/id/:id", function(req, res) {
    Todos.find({_id : req.params.id}, "user task isDone hasAttachment", function(err, todos) {
        res.send(todos);
    });
});

routes.post("/todos", function(req, res) {
    if (req.body.id) {
        Todos.findByIdAndUpdate({_id: req.body.id}, req.body, function(err, responce) {
            res.send(responce);
        });
    }
    else {
        var newTodo = Todos({
            user : req.params.user,
            tast : req.params.task,
            isDone: req.params.isDone,
            hasAttachment : req.params.hasAttachment
        });

        newTodo.save(function(err) {
            res.send('success');
        });
    }
});

module.exports = routes;