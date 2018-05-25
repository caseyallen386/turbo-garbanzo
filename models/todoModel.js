var Mongoose = require('mongoose');

var { Schema } = Mongoose;

var todoSchema = new Schema({
    user : String,
    task: String,
    isDone : Boolean,
    hasAttachment : Boolean
});

module.exports = Mongoose.model("todo", todoSchema);