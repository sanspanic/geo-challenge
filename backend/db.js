const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

const db = new Client({
  connectionString: getDatabaseUri(),
  //uncomment following lines for deployment on heroku
  /*   ssl: {
    rejectUnauthorized: false,
  }, */
});

db.connect();

module.exports = db;
