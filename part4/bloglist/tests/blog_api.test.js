const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");
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

describe("GET blog Requests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

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
});

describe("POST blog Requests", () => {
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

  test("returns 400 if url title or url is missing", async () => {
    const post = {
      author: "Robert C. Martin 3",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll3",
    };

    await api
      .post("/api/blogs")
      .send(post)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body.length).toBe(initialBlogs.length);
  });
});

describe("DELETE blog Requests", () => {
  test("DELETE Request deletes blog", async () => {
    await api.delete("/api/blogs/5a422b891b54a676234d17fa").expect(204);
    const response = await api.get("/api/blogs");
    const ids = response.body.map((blog) => blog.id);

    expect(ids).not.toContain("5a422b891b54a676234d17fa");
    expect(response.body.length).toBe(initialBlogs.length - 1);
  });
});

describe("PUT blog Requests", () => {
  test("PUT Request updates blog", async () => {
    await api
      .put("/api/blogs/5a422b891b54a676234d17fa")
      .send({ likes: 22 })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const initialBlog = response.body.find(
      (blog) => blog.id === "5a422b891b54a676234d17fa"
    );

    expect(initialBlog.likes).toBe(22);
  });
});

describe("POST user requests with one user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root",
      password: passwordHash,
      name: "rootuser",
    });

    await user.save();
  });

  test("creation succeds", async () => {
    const initialUsersInDb = await User.find({});

    const newUser = { username: "user", password: "pass123", name: "usr" };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const currentUsersInDb = await User.find({});
    expect(currentUsersInDb.length).toBe(initialUsersInDb.length + 1);
  });

  test("returns status code '400' if password or username is missing from request", async () => {
    const initialUsersInDb = await User.find({});

    const newUserOne = { password: "pass123", name: "usr" };
    const newUserTwo = { username: "user", name: "usr" };

    await api.post("/api/users").send(newUserOne).expect(400);

    await api.post("/api/users").send(newUserTwo).expect(400);

    const currentUsersInDb = await User.find({});
    expect(currentUsersInDb.length).toBe(initialUsersInDb.length);
  });

  test("returns status code '400' if password's or username's length is less than 3", async () => {
    const initialUsersInDb = await User.find({});

    const newUserOne = { username: "us", password: "pass123", name: "usr" };
    const newUserTwo = { username: "user", password: "pa", name: "usr" };

    await api.post("/api/users/").send(newUserOne).expect(400);

    await api.post("/api/users/").send(newUserTwo).expect(400);

    const currentUsersInDb = await User.find({});
    expect(currentUsersInDb.length).toBe(initialUsersInDb.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
