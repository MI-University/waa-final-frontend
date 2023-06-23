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

const getOne = (id) => {
  return API.get(`${PATH}/${id}`)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
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

export { getAll, getOne, send };
