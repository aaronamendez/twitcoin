const Users = require("../models/");

const validateRegisterBody = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json("All fields are required!");
  } else {
    req.user = req.body;
    next();
  }
};

const userExists = (req, res, next) => {
  const { username } = req.body;
  Users.findByUsername(username)
    .then((user) => {
      if (user.length > 0) {
        next();
      } else {
        res.json("Invalid Credentials");
      }
    })
    .catch(() => {
      res.json("Invalid Credentials");
    });
};

const validateLoginBody = (req, res, next) => {};

module.exports = {
  userExists,
  validateRegisterBody,
  validateLoginBody,
};
