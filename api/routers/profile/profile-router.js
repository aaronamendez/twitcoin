const express = require("express");
const profileRouter = express.Router();

const Profile = require("./models");

const { restricted } = require("../restricted");

profileRouter.get("/", restricted, async (req, res) => {
    try {
        Profile.findProfileByUserId(req.user.id).then((profile) => {
            delete profile.password;
            res.status(200).json(profile);
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = profileRouter;
