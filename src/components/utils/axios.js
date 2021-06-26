import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.mercuryeunoia.com'
});

export const setAuthorization = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

export const setAuthorizationReset = () => {
  instance.defaults.headers.common.Authorization = '';
};

export default instance;
