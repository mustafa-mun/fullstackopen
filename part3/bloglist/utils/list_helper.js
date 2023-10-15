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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
