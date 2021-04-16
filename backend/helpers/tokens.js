const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// returns signed JWT from user data.

function createToken(user) {
  //console.log("created new jwt for user: ", user);

  let payload = {
    username: user.username,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
