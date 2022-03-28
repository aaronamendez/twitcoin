const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routers/auth/auth-router");
const postRouter = require("./routers/posts/posts-router");
const profileRouter = require("./routers/profile/profile-router");

server.use(express.json());
server.use(cors());
server.use(helmet());

// routers
server.use("/api/auth", authRouter);
server.use("/api/posts", postRouter);
server.use("/api/profile", profileRouter);

server.get("/", (_, res) =>
    res.json({ hello: "Welcome to Twitco's API. You're in early. 🤖" })
);

module.exports = server;
