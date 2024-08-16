import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
    AccessKey: import.meta.env.VITE_COINGECKO_API_KEY,
  },
});
