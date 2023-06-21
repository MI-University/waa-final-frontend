import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useData } from '@store/providers/Provider';
import Missing from '@pages/Missing';
import { userType } from '@utils/constants/types.contants';

const RequireOwner = () => {
  const { user } = useData();

  return user?.role === userType.OWNER && user?.approved ? (
    <Outlet />
  ) : (
    <Missing />
  );
};

export default RequireOwner;
