import { useNavigate } from 'react-router';

const { useData } = require('@store/providers/Provider');

const RedirectIfUser = () => {
  const { isAuthenticated } = useData();
  //   const navigate = useNavigate();

  if (!isAuthenticated) {
    return true;
  }
};

export default RedirectIfUser;
