import axios from 'axios';
import { FRONTEND_ENV } from '@/env';

const apiClient = axios.create({
  baseURL: FRONTEND_ENV.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

export { apiClient };
