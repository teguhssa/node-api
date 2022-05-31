const pool = require("../../../db/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../routes/utils/jwtGenerator");

exports.Registration = async (req, res) => {
  try {
    // dapetin inputan
    const { firstname, lastname, email, username, password } = req.body;

    // if (!(firstname && lastname && email && username && password)) {
    //     res.status(400).send("Form cannot be empty");
    // }
    // cek di database
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND username = $2",
      [email, username]
    );

    // res.json(checkUser.rows);

    if (checkUser.rows.length !== 0) {
      return res.status(401).send("User already exist");
    }

    // hash password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // masuk ke database
    const newData = await pool.query(
      "INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstname, lastname, email, username, bcryptPassword]
    );

    // res.json(newData.rows[0]);
    // console.log(newData.rows[0]);
    // console.log(bcryptPassword);
    const token = jwtGenerator(newData.rows[0].id_user);
    res.json({ token });

    // sign jwt
  } catch (err) {
    console.log("error", err);
    res.status(500).send("Internal server error");
  }
};

exports.Login = async (req, res) => {
  try {
    // dapetin inputan
    const { username, password } = req.body;

    // cek ada ga user nya

    const user = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("User doesn't exist");
    }

    // compare password sama yg ada di db

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Email or Password is incorrect");
    }

    const token = jwtGenerator(user.rows[0].id_user);

    res.json({ token });

    // verify token
  } catch (err) {
    console.log("error is here boy", err);
    res.status(500).send("Internal server error");
  }
};
