import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Blog } from '../src/components/Blogs';

test('not renders blogs URL and likes by default', () => {
  const user = {
    username: 'someusername',
    name: 'somename',
  };
  const someBlog = {
    title: 'someTitle ',
    author: 'someAuthor ',
    url: 'someUrl ',
    likes: 2,
    user,
  };
  const setBlogs = jest.fn();
  const blogs = [someBlog];

  const { container } = render(
    <Blog blog={someBlog} blogs={blogs} setBlogs={setBlogs} user={user}></Blog>,
  );

  const div = container.querySelector('.blog');

  expect(div).not.toHaveTextContent('someurl');
  expect(div).not.toHaveTextContent('2');
});

test('renders url and likes when view button is clicked', async () => {
  const usr = {
    username: 'someusername',
    name: 'somename',
  };
  const someBlog = {
    title: 'someTitle',
    author: 'someAuthor',
    url: 'someUrl',
    likes: 2,
    user: usr,
  };
  const setBlogs = jest.fn();
  const blogs = [someBlog];
  const { container } = render(
    <Blog blog={someBlog} blogs={blogs} setBlogs={setBlogs} user={usr}></Blog>,
  );

  const user = userEvent.setup();
  const button = container.querySelector('#view');
  await user.click(button);

  const div = container.querySelector('.blog');

  expect(div).toHaveTextContent('someurl');
  expect(div).toHaveTextContent('2');
});
