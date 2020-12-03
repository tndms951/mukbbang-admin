import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.mercuryeunoia.com',

  //로그인 설정되있게 일부로 넣은거임
  headers: {
    Authorization:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiZG9uZ2RvbmcxMkBuYXZlci5jb20iLCJuYW1lIjoi64-Z64-Z7J20IiwiaW1hZ2VVcmwiOiJodHRwczovL3MzLmFwLW5vcnRoZWFzdC0yLmFtYXpvbmF3cy5jb20vaW1hZ2UubWVyY3VyeWV1bm9pYS5jb20vaW1hZ2VzL3VzZXIvMTYwNDMyMjc4NjkzNy5qcGVnIiwiaWF0IjoxNjA2NzI2NDExfQ._7zrkXkGrFVwoxE_F7MpF2fWdrXFqm37RFnxm_z_1R0",
  },
});

export const setAuthorization = (token) => {
  instance.defaults.headers.common.Authorization = token;
  
 
};

export default instance;
