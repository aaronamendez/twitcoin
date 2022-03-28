const express = require("express");
const postRouter = express.Router();

const {
    validatePostBody,
    checkIfAuthor,
    checkPostExists,
} = require("./middleware");

const { restricted } = require("../restricted");

const Posts = require("./models/index");

postRouter.get("/", restricted, async (req, res) => {
    try {
        Posts.findAllPosts().then((posts) => {
            posts.reverse();
            res.json(posts);
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

postRouter.post("/", restricted, validatePostBody, async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

postRouter.delete(
    "/:id",
    restricted,
    checkIfAuthor,
    checkPostExists,
    async (req, res) => {
        try {
            Posts.deletePost(req.postId).then((deletedPost) => {
                // We may want to return ALL posts after actually
                res.status(200).json(deletedPost);
            });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

module.exports = postRouter;
