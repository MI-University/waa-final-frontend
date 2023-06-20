import API from '@config/config';
import { apiDomains } from '@utils/constants/types.contants';

const PATH = apiDomains.OFFER;

const getAll = () => {
  return API.get(`${PATH}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const accept = (id) => {
  return API.put(`${PATH}/${id}`, { active: true })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

export { getAll, accept };
