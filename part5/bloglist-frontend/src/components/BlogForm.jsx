import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setUrl(target.value);
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

  return (
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
  );
};

export default BlogForm;
