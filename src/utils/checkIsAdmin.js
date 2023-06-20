import { useNavigate } from 'react-router';
import { userType } from './constants/types.contants';

const { useData } = require('@store/providers/Provider');

const CheckIsAdmin = () => {
  const { user } = useData();

  if (user?.role !== userType.ADMIN) {
    return false;
  }
};

export default CheckIsAdmin;
