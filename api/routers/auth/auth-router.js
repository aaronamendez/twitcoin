const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models
const Users = require("./models/");

// Middlewares
const {
    validateRegisterBody,
    validateLoginBody,
    userExists,
} = require("./middleware");

authRouter.post("/register", validateRegisterBody, userExists, (req, res) => {
    const salt = 8;
    const hashedPassword = bcrypt.hashSync(req.user.password, salt);
    const newUser = {
        username: req.user.username,
        email: req.user.email,
        password: hashedPassword,
    };
    Users.createNewUser(newUser).then((user) => res.json(user));
});

module.exports = authRouter;
