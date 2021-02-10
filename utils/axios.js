import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : process.env.BASE_API_URL;

const customAxiosInstance = axios.create({baseURL, withCredentials: true});

export default customAxiosInstance;
