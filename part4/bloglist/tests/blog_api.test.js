const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsToSave = initialBlogs.map((blog) => new Blog(blog));
  const savedBlogs = blogsToSave.map((blog) => blog.save());
  await Promise.all(savedBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific note is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);
  expect(titles).toContain("First class tests");
});

test("identifier named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("http POST creates a new blog post", async () => {
  const post = {
    title: "First class tests 2",
    author: "Robert C. Martin 2",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll2",
    likes: 10,
    __v: 0,
  };

  await api
    .post("/api/blogs")
    .send(post)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((blog) => blog.title);

  expect(response.body.length).toBe(initialBlogs.length + 1);
  expect(titles).toContain("First class tests 2");
});

test("likes will have default value '0'", async () => {
  const post = {
    title: "First class tests 3",
    author: "Robert C. Martin 3",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll3",
  };

  const resp = await api
    .post("/api/blogs")
    .send(post)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(resp.body.likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
