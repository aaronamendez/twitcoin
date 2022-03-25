const express = require("express");
const postRouter = express.Router();

const { validatePostBody } = require("./middleware");

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

module.exports = postRouter;
