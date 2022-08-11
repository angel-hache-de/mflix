const { MongoClient } = require("mongodb");
const MoviesDAO = require("../models/moviesDAO");
const CatalogDAO = require("../models/catalogDAO");

const connectToDB = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      process.env.MFLIX_DB_URI,
      // Set the poolSize to 50 connections.
      // Set the write timeout limit to 2500 milliseconds.
      { wtimeoutMS: 2500, minPoolSize: 50, useNewUrlParser: true }
    )
      .catch((err) => {
        console.error(err.stack);
        process.exit(1);
      })
      .then(async (client) => {
        await MoviesDAO.injectDB(client);
        await CatalogDAO.injectDB(client);
        resolve(true);
      });
  });
};

module.exports = connectToDB;
