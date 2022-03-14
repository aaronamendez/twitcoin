const db = require("./../../../../configs/database");

const findByUsername = async (username) => {
    let result = await db("users").where("username", username);
    return result;
};

const findById = async (id) => {
    let result = await db("users").where("user_id", id);
    return result;
};

// Email needs to be unique
const createNewUser = async (user) => {
    let result = await db("users").insert(user, ["user_id", "username"]);
    return result[0];
};

module.exports = {
    findByUsername,
    findById,
    createNewUser,
};
