const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middlewares
const {
  validateRegisterBody,
  validateLoginBody,
  userExists,
} = require("./middleware");

authRouter.post("/register", validateRegisterBody, userExists, (req, res) => {
  const { username, email, password } = req.body;

  res.json(req.user);
});

module.exports = authRouter;
