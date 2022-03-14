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
    const salt = "";
    const hashedPassword = bcrypt.hashSync(req.user.password, salt);
});

module.exports = authRouter;
