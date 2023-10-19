import axios from "axios";
const baseUrl = "http://localhost:3003/api";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`);
  return request.then((response) => response.data);
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const create = async (body) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/blogs`, body, config);
  return response.data;
};

const update = async (id, body) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/blogs/${id}`, body, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/blogs/${id}`, config);
  return response.data;
};

export default { getAll, login, create, update, deleteBlog, setToken };
