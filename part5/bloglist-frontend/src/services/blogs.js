import axios from "axios";
const baseUrl = "http://localhost:3003/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`);
  return request.then((response) => response.data);
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export default { getAll, login };
