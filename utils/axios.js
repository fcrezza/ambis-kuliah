import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'idk';

const customAxiosInstance = axios.create({baseURL});

export default customAxiosInstance;
