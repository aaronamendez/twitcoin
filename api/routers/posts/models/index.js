const db = require("../../../../configs/database");

const findAllPosts = async () => {
    let result = db("posts");
    return result;
};

const createNewPost = async (body) => {
    let result = await db("posts").insert(body, [
        "post_id",
        "user_id",
        "post_body",
    ]);

    return result[0];
};

module.exports = {
    findAllPosts,
    createNewPost,
};
