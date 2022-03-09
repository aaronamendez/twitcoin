const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

server.use(express.json());
server.use(cors());
server.use(helmet());

module.exports = server;
