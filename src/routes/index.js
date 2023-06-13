import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements
} from 'react-router-dom';

import Layout from '../components/Layout';
import Landing from '../pages/Landing';
import Search from '@pages/Search';

const router = createBrowserRouter(
  createRoutesFromElements(
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
      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} loader={redirectIfUser} />
        <Route path="logout" action={logoutUser} />
      </Route> */}
    </Route>
  )
);

export default <RouterProvider router={router} />;
