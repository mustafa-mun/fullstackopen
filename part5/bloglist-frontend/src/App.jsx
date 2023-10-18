import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    blogService
      .login({ username, password })
      .then((user) => {
        setUser(user);
        blogService.setToken(user.token);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      })
      .catch((err) => console.log(err));
    setPassword("");
    setUsername("");
  };

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    blogService
      .create({ title, author, url })
      .then((newBlog) => {
        setBlogs(blogs.concat(newBlog));
      })
      .catch((err) => console.log(err));
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setUrl(target.value);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsername={handleUsernameChange}
          handlePassword={handlePasswordChange}
        ></LoginForm>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            setUser(null);
          }}
        >
          logout
        </button>
      </div>
      <h2>create new </h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label>title</label>
          <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>author</label>
          <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          <label>url</label>
          <input value={url} onChange={handleUrlChange} />
        </div>
        <button>create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
