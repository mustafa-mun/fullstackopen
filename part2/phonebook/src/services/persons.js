import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = async (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = async (id, newObject) => {
  const url = `${baseUrl}/${id}`;
  return axios.put(url, newObject).then((resp) => resp.data);
};

const deletePerson = async (id) => {
  const url = `${baseUrl}/${id}`;
  return axios.delete(url).then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deletePerson,
};
