import axios from 'axios';

const api = axios;
const baseURL = "http://localhost:3001"

const register = async (data) => {
  const resp = await api.post(`${baseURL}/users/register`, data);
  return resp.data
}

const login = async (data) => {
  const resp = await api.post(`${baseURL}/users/login`, data);
  return resp.data
}

export { register, login };