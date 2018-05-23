var express      = require('express');
var goose        = require("mongoose");
var config       = require("./config");
var path         = require('path');
var cookieParser = require('cookie-parser');
var sessions     = require('client-sessions');
var app          = express();
var passport     = require('passport');
var port         = process.env.port || 3000;

var setup   = require("./controllers/setupController");
var pages   = require("./controllers/mainController");
var api     = require("./controllers/apiController");

goose.connect( config.connectString(), { useMongoClient: true } );

app.use(cookieParser());
sessions({secret: "secret-session-key"});
app.use(passport.initialize());
app.use(passport.session());

app.set( "view engine", "ejs");
app.use( "/assets"    , express.static( path.join(__dirname, 'public') ));
app.use( "/setup"     , setup);
app.use( "/api"       , api);
app.use( "/"          , pages); 

app.listen(port);