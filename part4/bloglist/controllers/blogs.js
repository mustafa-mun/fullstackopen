const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ ...request.body, user });

  if (!blog.url || !blog.title) {
    return response.status(400).json({ error: "title and url are required" });
  }

  try {
    const savedBlog = await blog.save();
    user.blogs.push(savedBlog);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== request.user._id.toString()) {
      return response.status(403).json({ error: "unauthorized" });
    }
    await Blog.deleteOne({ _id: blog._id });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== request.user._id.toString()) {
      return response.status(403).json({ error: "unauthorized" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.json(updatedBlog).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
