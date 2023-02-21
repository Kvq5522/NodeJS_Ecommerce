"use strict";
const myEnvironment = require("../config/environment");
const mongoose = require("mongoose");
const { countConnect } = require("../helper/check.connect");

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (myEnvironment.status === "dev") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(myEnvironment.connectionString)
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
