const express = require("express");
const postRouter = express.Router();

const { validatePostBody, checkPostExists } = require("./middleware");

const { restricted } = require("../restricted");

const Posts = require("./models/index");

postRouter.get("/", restricted, (req, res) => {
    Posts.findAllPosts().then((posts) => {
        res.json(posts);
    });
});

postRouter.post("/", restricted, validatePostBody, (req, res) => {
    const obj = {
        user_id: req.user.id,
        post_body: req.postBody,
    };

    Posts.createNewPost(obj)
        .then((post) => {
            if (post) {
                res.status(201).json(post);
            } else {
                res.json("error?");
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Internal Server Error" });
        });
});

postRouter.delete("/:id", checkPostExists, (req, res) => {
    Posts.deletePost(req.postId).then((deletedPost) => {
        // We may want to return ALL posts after actually
        res.status(200).json(deletedPost);
    });
});

module.exports = postRouter;
