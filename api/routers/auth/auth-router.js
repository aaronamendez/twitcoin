require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// env variables
const {
    JWT_SECRET,
    SALT_ROUNDS_FOR_BCRYPT,
} = require("./../../../configs/auth");

// Models
const Users = require("./models/");

// Middlewares
const {
    validateRegisterBody,
    validateLoginBody,
    usernameExists,
    emailExists,
} = require("./middleware");

authRouter.post(
    "/register",
    validateRegisterBody,
    usernameExists,
    emailExists,
    async (req, res) => {
        try {
            const hashedPassword = bcrypt.hashSync(
                req.user.password,
                SALT_ROUNDS_FOR_BCRYPT
            );
            const newUser = {
                username: req.user.username,
                email: req.user.email,
                password: hashedPassword,
            };
            Users.createNewUser(newUser).then((user) => {
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username} ...`,
                    token,
                });
            });
        } catch (err) {
            res.status(500).json({
                error: err,
                message: "Internal Server Error",
            });
        }
    }
);

authRouter.post("/login", validateLoginBody, async (req, res) => {
    try {
        // res.json(req.user);
        Users.findByUsername(req.user.usernameOrEmail).then(
            (userWithUsername) => {
                if (userWithUsername.length > 0) {
                    // Authenticate
                    res.json("User with Username found!");
                } else {
                    Users.findByEmail(req.user.usernameOrEmail).then(
                        (userWithEmail) => {
                            if (userWithEmail.length > 0) {
                                // Authenticate
                                res.json("User with Email found!");
                            } else {
                                res.status(404).json({
                                    message: "Invalid Credentials",
                                });
                            }
                        }
                    );
                }
            }
        );
    } catch (err) {
        res.status(500).json({ error: err, message: "Internal Server Error" });
    }
});

function generateToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

module.exports = authRouter;
