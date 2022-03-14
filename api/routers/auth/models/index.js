const db = require("./../../../../configs/database");

const findByUsername = async (username) => {
    let result = await db("users")
        .where("username", username)
        .select("user_id", "username", "password");
    return result[0];
};

const findByEmail = async (email) => {
    let result = await db("users")
        .where("email", email)
        .select("user_id", "username");
    return result[0];
};

const findById = async (id) => {
    let result = await db("users")
        .where("user_id", id)
        .select("user_id", "username");
    return result[0];
};

// Email needs to be unique
const createNewUser = async (user) => {
    let result = await db("users").insert(user, ["user_id", "username"]);
    return result[0];
};

module.exports = {
    findByUsername,
    findByEmail,
    findById,
    createNewUser,
};
