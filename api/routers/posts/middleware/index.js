const Posts = require("../models");

const validatePostBody = (req, res, next) => {
    const { postBody } = req.body;

    if (!postBody) {
        res.status(400).json({ message: "Cannot create an empty post" });
    } else {
        req.postBody = postBody;
        next();
    }
};

const checkPostExists = async (req, res, next) => {
    const { id } = req.params;
    Posts.findPostById(id).then((post) => {
        if (!post) {
            res.status(404).json({ message: "That post does not exist" });
        } else {
            req.postId = id;
            next();
        }
    });
};

const checkIfAuthor = async (req, res, next) => {
    const { id } = req.params;
    Posts.findPostById(id).then((post) => {
        if (!post) {
            res.status(404).json({ message: "That post does not exist!" });
        } else {
            if (post.user_id === req.user.id) {
                next();
            } else {
                res.status(401).json({
                    message: "You are not the original author of this post",
                });
            }
        }
    });
};

module.exports = {
    validatePostBody,
    checkPostExists,
    checkIfAuthor,
};
