const db = require("../../../../configs/database");

const findAllPosts = async () => {
    let result = db("posts")
        .innerJoin("users", "posts.user_id", "users.user_id")
        .select("post_body", "post_id", "username");
    return result;
};

const findPostById = async (id) => {
    let result = await db("posts").where("post_id", id);
    return result[0];
};

const createNewPost = async (body) => {
    let result = await db("posts").insert(body, [
        "post_id",
        "user_id",
        "post_body",
    ]);

    return result[0];
};

const deletePost = async (id) => {
    let result = await db("posts").where("post_id", id).del().returning("*");

    return result[0];
};

module.exports = {
    findAllPosts,
    findPostById,
    createNewPost,
    deletePost,
};
