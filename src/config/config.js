import { getToken } from '@utils/helpers/token.helpers';
import axios from 'axios';
import Cookies from 'js-cookie';

const apliBaseUrl = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  timeout: 20000,
  baseURL: apliBaseUrl
});

API.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default API;
