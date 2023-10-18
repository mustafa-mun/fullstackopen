import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    blogService
      .login({ username, password })
      .then((user) => {
        setUser(user);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      })
      .catch((err) => console.log(err));
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
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
