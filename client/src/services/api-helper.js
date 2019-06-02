import axios from 'axios';

const BASE_URL = "http://localhost:3001/"
const token = "YouLearnMoreFromFailureThanFromSuccess"
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

const register = async (data) => {
  const resp = await api.post(`users/register`, data);
  return resp.data
}

const login = async (data) => {
  const resp = await api.post(`users/login`, data);
  return resp.data
}

const setTemp = async (data) => {
  const resp = await api.post(`users/${data.userId}/thermostat`, data);
  return resp.data;
}

export { register, login, setTemp };