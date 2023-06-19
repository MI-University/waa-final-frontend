import { Logo } from '@components/ui';
import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import AuthImg from '@assets/images/home-5.jpg';

const AuthLayout = () => {
  return (
    <div style={{ height: '100vh' }}>
      <div className="grid grid-cols-10 h-full">
        <div className="col-span-10 lg:col-span-4 bg-gray-300 hidden lg:block relative h-full">
          <span className="mask absolute bg-gray-800/30 h-full w-full left-0 top-0 block z-20"></span>
          <img
            src={AuthImg}
            alt=""
            className="object-cover h-full object-right relative z-10"
          />
        </div>
        <div className="col-span-10 relative lg:col-span-6 p-6 lg:p-20 flex justify-center">
          <div className="lg:w-3/4">
            <Link to="/" className="mb-12 absolute left-8 top-5 pr inline-flex">
              <Logo />
            </Link>
            <div
              className="flex items-center"
              style={{ height: 'calc(100% - 0px)' }}>
              <div className="flex-grow">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
