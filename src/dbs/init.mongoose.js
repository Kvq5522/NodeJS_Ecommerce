"use strict";
const mongoose = require("mongoose");
const { countConnect } = require("../helper/check.connect");
const config = require("../config/config.mongodb");

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (process.NODE_ENV === "dev") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(`${type}://${config.db.host}:${config.db.port}/${config.db.name}`)
      .then(() => {
        console.log("Connected to MongoDB");
        countConnect();
      })
      .catch((err) => console.log(err));
  }

  static getInstace() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongoDB = Database.getInstace();
module.exports = instanceMongoDB;
