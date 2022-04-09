const express = require("express");
const profileRouter = express.Router();

const Profile = require("./models");

const { checkIfUser } = require("./middleware");
const { restricted } = require("../restricted");

profileRouter.get("/:username", restricted, checkIfUser, async (req, res) => {
    try {
        res.status(200).json(req.profile);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// testing purposes only
// profileRouter.post("/", (req, res) => {
//     Profile.findFollowersCount(1).then((follows) => {
//         res.json(follows);
//     });
// });

module.exports = profileRouter;
