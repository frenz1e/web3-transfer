import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    AccessKey: import.meta.env.VITE_COINGECKO_API_KEY,
  },
});
