import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeStyle = {
    backgroundColor: 'red',
    color: 'white',
  };

  if (!viewDetails) {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}{' '}
        <button id='view' onClick={() => setViewDetails(true)}>
          view
        </button>
      </div>
    );
  }

  const handleRemove = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          const newBlogs = blogs.filter((blg) => blg.id !== blog.id);
          setBlogs(newBlogs);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className='blog' style={blogStyle}>
      <div>
        <p>
          {blog.title} {blog.author}{' '}
        </p>
        <button id='hide' onClick={() => setViewDetails(false)}>
          hide
        </button>
        <br />
      </div>
      <div>{blog.url}</div>
      <div>
        <p>likes {likes}</p>
        <button
          onClick={() => {
            blogService.update(blog.id, { likes: likes + 1 }).catch((err) => console.log(err));
            setLikes(likes + 1);
          }}
        >
          like
        </button>
      </div>
      <div>{blog.user.name}</div>
      {user.name === blog.user.name && (
        <button style={removeStyle} onClick={handleRemove}>
          remove
        </button>
      )}
    </div>
  );
};

const Blogs = ({ blogs, setBlogs, user }) => {
  return blogs
    .sort((b1, b2) => (b1.likes < b2.likes ? 1 : b1.likes > b2.likes ? -1 : 0))
    .map((blog) => (
      <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
    ));
};

export { Blog, Blogs };
