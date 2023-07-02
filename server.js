const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const userModel = require('./model/user.model')
const app = express();

/**
 * Logic to connect to MongoDb and create an ADMIN user
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to db");
});

db.once("open", () => {
  console.log("DB is connected");
  init();
});

async function init() {
  /**
   * Initialize the mongo db
   * 
   * Need to create the ADMIN user
   */

  const admin = await userModel.create({
    name : "Himanshu",
    userId : 1,
    email : "himanshupandey1036@gmail.com",
    password : "Himanshu2003",
    userType : 1,
  })

  console.log(admin);
}

app.listen(serverConfig.PORT, () => {
  console.log(
    `Server Started on the port number is ${serverConfig.PORT}`
  );
});
