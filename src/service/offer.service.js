import API from '@config/config';
import { apiDomains } from '@utils/constants/types.contants';

const PATH = apiDomains.OFFER;

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

const addOne = (body) => {
  return API.post(`${PATH}`, body)
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const accept = (id) => {
  return API.put(`${PATH}/${id}`, { active: true })
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const acceptByOwner = (id) => {
  return API.put(`${PATH}/${id}/accept-by-owner`, {
    id
  })
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const acceptByCustomer = (id) => {
  return API.put(`${PATH}/${id}/accept-by-customer`, { id })
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const cancel = (id) => {
  return API.post(`${PATH}/${id}/cancel`, { id: id })
    .then((res) => {
      return res.data?.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

export { getAll, addOne, acceptByCustomer, acceptByOwner, cancel };
