import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://pro-openapi.debank.com/v1',
  headers: {
    'Content-Type': 'application/json',
    AccessKey: import.meta.env.VITE_DEBANK_API_KEY,
  },
});
