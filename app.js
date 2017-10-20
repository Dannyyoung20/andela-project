require("dotenv").load();

// Load dependecies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("express-flash");
const hbs = require("express-handlebars");
const debug = require('debug')('andela:server');
const http = require('http');
const path = require("path");
const expressValidator = require("express-validator");
const port = process.env.PORT || '3000';
const favicon = require("serve-favicon");
const api = require('./routes/api');

const app = express();

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

app.use(favicon(path.join(__dirname, 'public','img', 'icon.png')));
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

app.use(function(err, req, res, next) {
    // Sets the erros to a local variable message
    req.locals.message = err.message;
    req.locals.errors = process.env.NODE_DEV === 'development' ? err : {};
});


// Set the port address of the app
app.set('port', port);

// Run the server
const server = http.createServer(app);

server.listen(port);
