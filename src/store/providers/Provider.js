import { removeToken, setToken } from '@utils/helpers/token.helpers';
import { useCallback, useMemo } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { authActions, store } from '..';

export const useData = () => {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const registrationSuccess = useCallback(
    (author) => {
      setToken(author.token);
      dispatch(authActions.register(author));
    },
    [dispatch]
  );

  const loginSuccess = useCallback(
    (author) => {
      setToken(author.token);
      dispatch(authActions.login(author));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    removeToken();
    dispatch(authActions.logout());
  }, [dispatch]);

  return useMemo(
    () => ({
      ...authData,
      loginSuccess,
      registrationSuccess,
      logout
    }),
    [authData]
  );
};

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
