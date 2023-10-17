const UserRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

UserRouter.get("", async (req, res, next) => {
  try {
    const users = await User.find({}).populate("blogs");
    res.json(users);
  } catch (error) {
    next(error);
  }
});

UserRouter.post("", async (req, res, next) => {
  const body = req.body;
  if (!body.username || !body.password) {
    return res.status(400).json({ error: "username and password required" });
  }

  if (body.password.length < 3) {
    return res
      .status(400)
      .json({ error: "password should be at least 3 characters" });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = new User({
    username: body.username,
    password: hashedPassword,
    name: body.name,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser).end();
  } catch (error) {
    next(error);
  }
});

module.exports = UserRouter;
