const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id_user) {
  const payload = {
    user: id_user,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
