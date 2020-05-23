import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://links-v1.cocahack.me',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axios;
