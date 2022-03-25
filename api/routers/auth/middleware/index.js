const Users = require("../models/");

const validateRegisterBody = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: "All Fields Are Required" });
    } else {
        req.user = req.body;
        next();
    }
};

const validateLoginBody = (req, res, next) => {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
        res.status(400).json({ message: "All Fields Are Requiddred" });
    } else {
        req.user = req.body;
        next();
    }
};

const usernameExists = async (req, res, next) => {
    try {
        const { username } = req.body;
        Users.findByUsername(username).then((user) => {
            if (user) {
                res.status(400).json({ message: "Username Taken" });
            } else {
                next();
            }
        });
    } catch (err) {
        res.status(500).json({ error: err, message: "Internal Server Error" });
    }
};

const emailExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        Users.findByEmail(email).then((user) => {
            if (user) {
                res.status(400).json({
                    message: "A User with that Email already exists!",
                });
            } else {
                next();
            }
        });
    } catch (err) {
        res.status(500).json({ error: err, message: "Internal Server Error" });
    }
};

module.exports = {
    usernameExists,
    emailExists,
    validateRegisterBody,
    validateLoginBody,
};
