import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useData } from '@store/providers/Provider';
import Missing from '@pages/Missing';
import { userType } from '@utils/constants/types.contants';

const RequireAdmin = () => {
  const { user } = useData();

  return user?.role === userType.ADMIN ? <Outlet /> : <Missing />;
};

export default RequireAdmin;
