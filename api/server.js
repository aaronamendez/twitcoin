const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const authRouter = require("./routers/auth/auth-router");

server.use(express.json());
server.use(cors());
server.use(helmet());

// routers
server.use("/api/auth", authRouter);

module.exports = server;
