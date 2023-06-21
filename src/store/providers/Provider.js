import { removeToken, setToken } from '@utils/helpers/token.helpers';
import { useCallback, useMemo } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { authActions, propertyActions, store } from '..';

export const useData = () => {
  const authData = useSelector((state) => state.auth);
  const propertyData = useSelector((state) => state.property);
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

  const saveProperty = useCallback(
    (property) => {
      dispatch(propertyActions.save(property));
    },
    [dispatch]
  );

  const unsaveProperty = useCallback(
    (id) => {
      dispatch(propertyActions.unsave(id));
    },
    [dispatch]
  );

  const isSavedProperty = useCallback(
    (id) => {
      return id && propertyData?.properties?.find((p) => p.id == id);
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      ...authData,
      ...propertyData,
      loginSuccess,
      registrationSuccess,
      logout,
      saveProperty,
      unsaveProperty,
      isSavedProperty
    }),
    [authData, propertyData]
  );
};

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
