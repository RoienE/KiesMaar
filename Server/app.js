
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Initialise Azure Insights for my application
//azureInsights.setup().start();

/**
 * START -------   Custom routes/API's
 */
//var firebaseRoute = require('./routes/firebase');
/**
 * END -------   Custom routes/API's
 */

var app = express();

// Connecting to my MongoDB with a secured connection string, string is saved at the environment variables sections of Azure
mongoose.connect(
    process.env.DBURL || 'mongodb://localhost:27017/FamilySavings',
    { useNewUrlParser: true }
); // 'mongodb://RoienE:LikeIlike1995@cproefrotech-shard-00-00-c4aux.mongodb.net:27017,cproefrotech-shard-00-01-c4aux.mongodb.net:27017,cproefrotech-shard-00-02-c4aux.mongodb.net:27017/CProefRoTech?ssl=true&replicaSet=CProefRoTech-shard-0&authSource=admin' 'mongodb://localhost:27017/CProefRoTech'

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setting the CORS Middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, GET, PATCH, DELETE, OPTIONS, PUT'
    );
    next();
});

/**
 * START -------   Assigning routes to url's
 */
//app.use('/firebase', firebaseRoute);
/**
 * END -------   Assigning routes to url's
 */

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   res.render('index');
// });

module.exports = app;
