import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Routes
} from 'react-router-dom';

import redirectIfUser from '@utils/redirectIfUser';
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

export default (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route
        path="search"
        element={<Search />}
        loader={({ request }) =>
          fetch('/api/dashboard.json', {
            signal: request.signal
          })
        }
      />
    </Route>
    <Route element={<RequireAuth />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/my-properties" element={<MyPropertiesPage />} />
        <Route
          path="/dashboard/my-properties/:id"
          element={<MyPropertyDetailPage />}
        />
        <Route
          path="/dashboard/my-properties/new"
          element={<MyNewPropertyPage />}
        />
        <Route
          path="/dashboard/my-properties/:id/update"
          element={<MyPropertyUpdatePage />}
        />
      </Route>
    </Route>
    <Route element={<AuthLayout />}>
      <Route
        path="register"
        element={<RegisterPage />}
        loader={redirectIfUser}
      />
      <Route path="login" element={<LoginPage />} loader={redirectIfUser} />
    </Route>
    <Route path="*" element={<Missing />} />
  </Routes>
);
