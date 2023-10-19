import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ type: "", body: "" });
  const [user, setUser] = useState(null);

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    blogService
      .login({ username, password })
      .then((user) => {
        setUser(user);
        blogService.setToken(user.token);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      })
      .catch(() => {
        handleNotification({
          type: "error",
          message: "wrong username or password",
        });
      });
    setPassword("");
    setUsername("");
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
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

  return (
    <div>
      <Notification message={notification}></Notification>
      {user === null ? (
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
      ) : (
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
          <BlogForm blogs={blogs} setBlogs={setBlogs}></BlogForm>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
