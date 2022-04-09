const Profile = require("../models");

const checkIfUser = async (req, res, next) => {
    try {
        const { username } = req.params;

        Profile.findByUsername(username).then((user) => {
            if (!user) {
                res.status(404).json({ message: "User doesn't exist" });
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

const sameUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const { bio, location, website } = req.body;

        Profile.findByUsername(username).then((checkUser) => {
            if (!checkUser) {
                res.status(404).json({ message: "User doesn't exist" });
            } else {
                const obj = {
                    bio,
                    location,
                    website,
                };
                Profile.updateUserProfile(checkUser.user_id, obj).then(
                    (updated) => {
                        Profile.findByUsername(username).then((user) => {
                            delete user.password;
                            req.profile = user;
                            next();
                        });
                    }
                );
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    checkIfUser,
    sameUser,
};
