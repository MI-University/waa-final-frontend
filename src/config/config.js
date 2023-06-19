import axios from "axios";

const apliBaseUrl = process.env.REACT_APP_API_BASE_URL;

const API = axios.create({
  baseURL: apliBaseUrl,
});

export default API;
