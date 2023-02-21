'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;

//count number of connections
const countConnect = () => {
    const numConnections = mongoose.connections.length;

    console.log(`Number of connections::${numConnections}`);
}

//check over load
const checkOverLoad = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;  
        const maxConnections = numCores * 5; //Assume 1 core can handle max 5 connections

        console.log(`Memory usage::${memoryUsage / 1024 / 1024 } MB`);

        if (numConnections >= maxConnections) {
            console.log(`Connection Overload!`);
        }
        
        
    }, _SECONDS); //Monitor every 5 seconds
}

module.exports = {
    countConnect,
    checkOverLoad
}