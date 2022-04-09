const db = require("../../../../configs/database");

const findUserById = async (id) => {
    let [result] = await db("users").where("user_id", id);
    return result;
};

const findByUsername = async (username) => {
    let result = await db("users").where("username", username);
    return result[0];
};

const getUserProfile = async (username) => {
    let [userResult] = await db("users").where("username", username);
    let [followerCount] = await db("follows")
        .where("follower", userResult.user_id)
        .count("follower", { as: "following" });
    let [followingCount] = await db("follows")
        .where("following", userResult.user_id)
        .count("following", { as: "followers" });

    return { ...userResult, ...followerCount, ...followingCount };
};

const updateUserProfile = async (id, body) => {
    let result = await db("users").where("user_id", id).update({
        bio: body.bio,
        location: body.location,
        website: body.website,
    });

    return result;
};

module.exports = {
    findUserById,
    findByUsername,
    getUserProfile,
    updateUserProfile,
};
