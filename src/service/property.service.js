import API from '@config/config';

const PATH = '/properties';

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

const getOne = (id) => {
  return API.get(`${PATH}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

const addOne = (data) => {
  return API.post(`${PATH}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const deleteOne = (id) => {
  return API.delete(`${PATH}/${id}`);
};

export { getAll, getOne, addOne, deleteOne };
