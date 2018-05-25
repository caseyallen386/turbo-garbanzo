const util = require('util');
var configFile;

if (process.env.NODE_ENV === 'Production'){
    configFile = './config.json';
} else {
    configFile = './config.dev.js';
}
 
var config = require(configFile);
var db = config.db;

module.exports = {
    GoogleOAuth : config.GoogleOAuth,
    cookie : config.cookie,
    DbConnect : function() {
        return util.format( db.conn, db.user, db.pass, db.uri );
    }
}