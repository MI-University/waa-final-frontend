import { tokenKey } from '@utils/constants/types.contants';
import Cookies from 'js-cookie';

export const getToken = () => {
  const token = Cookies.get(tokenKey);
  return token;
};

export const setToken = (token) => {
  Cookies.set(tokenKey, token);
};

export const removeToken = () => {
  Cookies.remove(tokenKey);
};
