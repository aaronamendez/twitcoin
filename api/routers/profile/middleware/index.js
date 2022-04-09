const Profile = require("../models");

const checkIfUser = async (req, res, next) => {
    try {
        const { username } = req.params;

        Profile.userExists(username).then((user) => {
            if (!user) {
                res.status(404).json({ message: "User doesn't exist!" });
            } else {
                Profile.getUserProfile(user.username).then((profile) => {
                    if (!profile) {
                    } else {
                        delete profile.password;

                        if (req.user.username === username) {
                            profile.isUser = true;
                            res.status(200).json(profile);
                        } else {
                            req.profile = profile;
                            next();
                        }
                    }
                });
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    checkIfUser,
};
