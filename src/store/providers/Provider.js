import { removeToken, setToken } from '@utils/helpers/token.helpers';
import { useCallback, useMemo } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { authActions, modalActions, propertyActions, store } from '..';

export const useData = () => {
  const authData = useSelector((state) => state.auth);
  const propertyData = useSelector((state) => state.property);
  const modalData = useSelector((state) => state.modal);
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

  const openModal = useCallback(() => {
    return dispatch(modalActions.open());
  }, [dispatch]);

  const closeModal = useCallback(() => {
    return dispatch(modalActions.close());
  }, [dispatch]);

  const setModalContent = useCallback(
    (children) => {
      return dispatch(modalActions.setContent(children));
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      ...authData,
      ...propertyData,
      ...modalData,
      loginSuccess,
      registrationSuccess,
      logout,
      saveProperty,
      unsaveProperty,
      isSavedProperty,
      openModal,
      closeModal,
      setModalContent
    }),
    [authData, propertyData, modalData]
  );
};

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
