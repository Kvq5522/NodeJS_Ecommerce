const { config } = require("dotenv");

config('../../.env');

module.exports = {
    secret: process.env.SECRET,
    connectionString: process.env.CONNECTION_STRING,
    status: process.env.STATUS
};