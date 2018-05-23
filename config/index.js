const util = require('util');
var configFile;

if (process.env.NODE_ENV === 'Production'){
    configFile = './config.json';
} else {
    configFile = './config.dev.json';
}
 
var config = require(configFile);

module.exports = {
    db : config.db,
    google : config.GoogleOAuth.Web,
    DbConnectString : function() {
        return util.format( db.conn, db.user, db.pass, db.uri );
    }
}