import API from '@config/config';
import { apiDomains } from '@utils/constants/types.contants';

const PATH = apiDomains.AUTH;

const login = (data) => {
  return API.post(`${PATH}/authenticate`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error('Login error', error);
      throw Error(error);
    });
};

const register = (data) => {
  return API.post(`${PATH}/register`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error('Registration error:', error);
      throw Error(error);
    });
};

export { login, register };
