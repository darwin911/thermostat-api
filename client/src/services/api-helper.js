import axios from 'axios';

const test = async () => {
  const resp = await axios('http://localhost:3000');
  return resp
}

export { test };