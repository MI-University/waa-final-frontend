import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Routes
} from 'react-router-dom';

import Layout from '../components/Layout';
import Landing from '../pages/Landing';
import Search from '@pages/Search';
import AuthLayout from '@components/AuthLayout';
import RegisterPage from '@pages/Register';
import { RequireAuth } from '@components/ui';
import Missing from '@pages/Missing';
import redirectIfUser from '@utils/redirectIfUser';
import LoginPage from '@pages/Login';

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
      {/* <Route path="/" element={<UserProfile />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/counter" element={<Counter />} /> */}
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
