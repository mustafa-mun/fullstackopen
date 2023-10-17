const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");

const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const blogsController = require("./controllers/blogs");
const usersController = require("./controllers/users");
const loginController = require("./controllers/login");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/api/blogs", blogsController);
app.use("/api/users", usersController);
app.use("/api/login", loginController);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
