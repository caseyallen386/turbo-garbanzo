var goose = require('mongoose');

var Schema = goose.Schema;

var todoSchema = new Schema({
    user : String,
    task: String,
    isDone : Boolean,
    hasAttachment : Boolean
});

module.exports = goose.model("todo", todoSchema);