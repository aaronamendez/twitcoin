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
const { restricted } = require("../restricted");

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
                // res.json(user);
                const token = generateToken(user);
                res.status(201).json({
                    message: `Welcome ${user.username}!`,
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
        Users.findByUsername(req.user.usernameOrEmail).then(
            (userWithUsername) => {
                if (!userWithUsername) {
                    Users.findByEmail(req.user.usernameOrEmail).then(
                        (userWithEmail) => {
                            if (userWithEmail) {
                                // Authenticate
                                if (
                                    bcrypt.compareSync(
                                        req.user.password,
                                        userWithEmail.password
                                    )
                                ) {
                                    let payload = {
                                        user_id: userWithEmail.user_id,
                                        username: userWithEmail.username,
                                    };
                                    let token = generateToken(payload);
                                    res.status(200).json({
                                        message: `Welcome back ${userWithEmail.username}!`,
                                        token,
                                    });
                                } else {
                                    res.status(400).json({
                                        message: "Invalid Credentials",
                                    });
                                }
                            } else {
                                res.status(400).json({
                                    message: "Invalid Credentials",
                                });
                            }
                        }
                    );
                } else {
                    // Authenticate
                    if (
                        bcrypt.compareSync(
                            req.user.password,
                            userWithUsername.password
                        )
                    ) {
                        let payload = {
                            user_id: userWithUsername.user_id,
                            username: userWithUsername.username,
                        };
                        let token = generateToken(payload);
                        res.status(200).json({
                            message: `Welcome back ${userWithUsername.username} 👋!`,
                            token,
                        });
                    } else {
                        res.status(400).json({
                            message: "Password is wrong!",
                        });
                    }
                }
            }
        );
    } catch (err) {
        res.status(500).json({ error: err, message: "Internal Server Error" });
    }
});

function generateToken(user) {
    const payload = {
        id: user.user_id,
        username: user.username,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "3d" });
}

authRouter.get("/test", restricted, (req, res) => {
    res.json({ message: "Authorized", user: req.user });
});

module.exports = authRouter;
