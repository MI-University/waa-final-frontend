import API from '@config/config';
import { apiDomains } from '@utils/constants/types.contants';

const PATH = apiDomains.OWNER;

const getAll = (params) => {
  return API.get(`${PATH}`, {
    params: params
  })
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const updateOne = (id, body) => {
  return API.put(`${PATH}/${id}`, body)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const accept = (id) => {
  return updateOne(id, { approve: true })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

export { getAll, updateOne, accept };
