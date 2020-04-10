import axios from 'axios';

const backendAxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/dev'
      : 'https://links-v1.cocahack.me',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default backendAxiosInstance;
