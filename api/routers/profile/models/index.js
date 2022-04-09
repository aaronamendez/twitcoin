const db = require("../../../../configs/database");

const userExists = async (username) => {
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

module.exports = {
    userExists,
    getUserProfile,
};
