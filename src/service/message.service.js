import API from '@config/config';
import { apiDomains } from '@utils/constants/types.contants';

const PATH = apiDomains.MESSAGE;

const getAll = () => {
  return API.get(`${PATH}`)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const send = (body) => {
  return API.post(`${PATH}`, body)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

export { getAll, send };
