const db = require("./../../../../configs/database");

const findByUsername = async (username) => {
  let result = await db("users").where("username", username);
  return result;
};

module.exports = {
  findByUsername,
};
