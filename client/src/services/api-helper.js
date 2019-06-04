import axios from "axios";

// const BASE_URL = "http://localhost:3001/";
const BASE_URL = "https://smart-thermostat.herokuapp.com/";
const token = "YouLearnMoreFromFailureThanFromSuccess";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const register = async data => {
  const resp = await api.post(`users/register`, data);
  return resp.data;
};

const login = async data => {
  const resp = await api.post(`users/login`, data);
  return resp.data;
};

const getThermostat = async data => {
  const resp = await api.get(`users/${data.userId}/thermostat`);
  return resp.data;
};

const setThermostat = async data => {
  const resp = await api.post(`users/${data.userId}/thermostat`, data);
  return resp.data;
};

export { register, login, setThermostat, getThermostat };
