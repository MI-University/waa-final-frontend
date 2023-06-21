import API from '@config/config';
import { apiDomains } from '@utils/constants/types.contants';

const PATH = apiDomains.PROPERTY;

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

const addOne = (data) => {
  return API.post(`${PATH}`, data)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const updateOne = (id, data) => {
  return API.put(`${PATH}/${id}`, data)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const deleteOne = (id) => {
  return API.delete(`${PATH}/${id}`)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

export { getAll, getOne, addOne, updateOne, deleteOne };
