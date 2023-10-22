import axios from "axios";

const baseUrl = "http://127.0.0.1:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (body) => {
  const response = await axios.post(baseUrl, body);
  return response.data;
};

const update = async (body) => {
  const response = await axios.put(`${baseUrl}/${body.id}`, body);
  return response.data;
};

export default { getAll, create, update };
