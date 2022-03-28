const db = require("../../../../configs/database");

const findProfileByUserId = async (id) => {
    let result = await db("users").where("user_id", id);
    return result[0];
};

module.exports = {
    findProfileByUserId,
};
