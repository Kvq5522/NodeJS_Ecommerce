const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

//init middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false, limit: '25mb'}));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init db
require('./dbs/init.mongoose');
// const {checkOverLoad} = require('./helper/check.connect');
// checkOverLoad();

//init routes
app.use('/', require('./routes/index'));

//handling error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal server error'
    });
});

module.exports = app;

