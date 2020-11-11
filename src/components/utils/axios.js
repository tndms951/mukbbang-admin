import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.35.109.159:3000',
});

export const setAuthorization = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

export default instance;
