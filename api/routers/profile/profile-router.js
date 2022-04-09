const express = require("express");
const profileRouter = express.Router();

const Profile = require("./models");

const { checkIfUser, updateUser } = require("./middleware");
const { restricted } = require("../restricted");

profileRouter.get("/:username", restricted, checkIfUser, async (req, res) => {
    try {
        res.status(200).json(req.profile);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

profileRouter.put("/:username", restricted, updateUser, async (req, res) => {
    try {
        res.status(200).json(req.profile);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = profileRouter;
