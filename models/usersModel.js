var Mongoose = require('mongoose');

var { Schema } = Mongoose;

var usersSchema = new Schema({
    username : String,
    password : String,
    email : String,
    googleId : String,
    name : String
});

usersSchema.methods.findOrCreate = function(queryObject, callback){

}

module.exports = Mongoose.model("user", usersSchema);