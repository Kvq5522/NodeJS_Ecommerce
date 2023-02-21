const { config } = require("dotenv");

config('../../.env');

module.exports = {
    secret: process.env.SECRET,
};