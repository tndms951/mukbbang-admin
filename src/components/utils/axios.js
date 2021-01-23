import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.mercuryeunoia.com',

  // 로그인 설정되있게 일부로 넣은거임
  headers: {
    Authorization:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiZG9uZ2RvbmcxMkBuYXZlci5jb20iLCJuYW1lIjoi64-Z64-Z7J20IiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmFwLW5vcnRoZWFzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2UubWVyY3VyeWV1bm9pYS5jb20vaW1hZ2VzL3VzZXIvMTYwNDMyMjc4NjkzNy5qcGVnIiwiaWF0IjoxNjExMzc2NjQyfQ.jA6wIa7rE5Z2HOs629BYYLxS-PVl0WL3h_8KKYrZGfGf1jDse0P-7Yf7V9_mwJ3hm3cu6pzQx55oRLDSOHO14Q'
  }
});

export const setAuthorization = (token) => {
  instance.defaults.headers.common.Authorization = token;
};

export default instance;
