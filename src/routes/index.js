import React from 'react';
import { Route, Routes } from 'react-router-dom';

import redirectIfUser from '@utils/redirectIfUser';
import { paths } from '@utils/constants/paths.contants';
import checkIsAdmin from '@utils/checkIsAdmin';
import { RequireAuth } from '@components/ui';
import Layout from '@components/Layout';
import AuthLayout from '@components/AuthLayout';
import DashboardLayout from '@components/DashboardLayout';
import Landing from '@pages/Landing';
import Search from '@pages/Search';
import RegisterPage from '@pages/Register';
import Missing from '@pages/Missing';
import LoginPage from '@pages/Login';
import DashboardPage from '@pages/dashboard';
import MyPropertiesPage from '@pages/dashboard/my-properties';
import MyNewPropertyPage from '@pages/dashboard/my-properties/New';
import MyPropertyDetailPage from '@pages/dashboard/my-properties/Details';
import MyPropertyUpdatePage from '@pages/dashboard/my-properties/Update';
import PendingOwnersPage from '@pages/dashboard/pending-owners';
import MyOffersPage from '@pages/dashboard/my-offers';
import PropertiesPage from '@pages/properties';

export default (
  <Routes>
    <Route path={paths.BASE} element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path={paths.SEARCH} element={<Search />} />
      <Route path={paths.PROPERTIES} element={<PropertiesPage />} />
      <Route path={paths.PROPERTY_DETAILS} element={<MyPropertyDetailPage />} />
    </Route>
    <Route element={<RequireAuth />}>
      <Route element={<DashboardLayout />}>
        <Route path={paths.DASHBOARD} element={<DashboardPage />} />
        <Route path={paths.MY_PROPERTIES} element={<MyPropertiesPage />} />
        <Route
          path={paths.MY_PROPERTY_DETAILS}
          element={<MyPropertyDetailPage />}
        />
        <Route
          path={paths.MY_PROPERTY_CREATE}
          element={<MyNewPropertyPage />}
        />
        <Route
          path={paths.MY_PROPERTY_UPDATE}
          element={<MyPropertyUpdatePage />}
        />
        <Route
          path={paths.PENDING_OWNERS}
          element={<PendingOwnersPage />}
          loader={checkIsAdmin}
        />
        <Route path={paths.MY_OFFERS} element={<MyOffersPage />} />
      </Route>
    </Route>
    <Route element={<AuthLayout />}>
      <Route
        path={paths.REGISTER}
        element={<RegisterPage />}
        loader={redirectIfUser}
      />
      <Route
        path={paths.LOGIN}
        element={<LoginPage />}
        loader={redirectIfUser}
      />
    </Route>
    <Route path={paths.ALL} element={<Missing />} />
  </Routes>
);
