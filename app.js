require("dotenv").load();

// Load dependecies
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var flash = require("express-flash");
var hbs = require("express-handlebars");
var debug = require('debug')('andela:server');
var http = require('http');
var path = require("path");
var expressValidator = require("express-validator");
var port = process.env.PORT || '3000';
var favicon = require("serve-favicon");
var api = require('./routes/api');

var app = express();

var index = require("./routes/index");

// Connect to the mongodb lib via mongoose
mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true,
    promiseLibrary: require("bluebird")
});
// Set mongoose promise lib.
mongoose.Promise = require("bluebird");

// Initialize Middleware
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());
app.use(expressValidator());

// Set html view engine 
app.engine("hbs", hbs(process.env.HBS_OPTIONS));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set static folder path
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// Handle the 404 Errors
app.use(function(req, res, next) {
    res.status(404);
    
    if(req.accepts('html')) {
        res.render('404', {url: req.url});
        return;
    }
    next();    
});


// Set the port address of the app
app.set('port', port);

// Run the server
var server = http.createServer(app);

server.listen(port);
