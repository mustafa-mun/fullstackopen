const dummy = (blogs) => {
  // ...
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return curr.likes + acc;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let output = { likes: 0 };

  if (blogs.length === 0) return {};

  blogs.forEach((blog) => {
    if (blog.likes > output.likes) {
      output = blog;
    }
  });

  return output;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const output = { author: "", blogs: 0 };

  const counter = {};

  blogs.forEach((blog) => {
    if (counter[blog.author]) {
      counter[blog.author] += 1;
      if (counter[blog.author] > output.blogs) {
        output.author = blog.author;
        output.blogs = counter[blog.author];
      }
    } else {
      counter[blog.author] = 1;
    }
  });

  return output;
};

module.exports = {
  dummy,
  mostBlogs,
  totalLikes,
  favoriteBlog,
};
