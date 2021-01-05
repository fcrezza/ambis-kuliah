import axios from 'axios';

const customAxiosInstance = axios.create({
  baseURL: 'http://localhost:4000'
});

export default customAxiosInstance;
