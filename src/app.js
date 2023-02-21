const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const myENV = require('./config/environment');

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '25mb'}));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(session({
    secret: myENV.secret,
    resave: false,
    saveUninitialized: false,
}));

//init db
require('./dbs/init.mongoose');
const {checkOverLoad} = require('./helper/check.connect');
checkOverLoad();

//init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({ message: 'Welcome to the API' });
});

//handling error

module.exports = app;

