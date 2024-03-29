import { Logo } from '@components/ui';
import { navItems } from '@data/dynamic';
import { useData } from '@store/providers/Provider';
import { paths } from '@utils/constants/paths.contants';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link, redirect } from 'react-router-dom';
import s from './DashboardLayout.module.css';

const DashboardLayout = () => {
  const [inMessagePage, setInMessagePage] = useState(false);
  const location = useLocation();
  const { logout, user } = useData();
  const nav = navItems[user.role];
  const isApproved = user?.approved;
  const onLogout = async () => {
    logout();
    redirect('/');
  };
  useEffect(() => {
    if (location.pathname.includes(paths.MY_MESSAGES)) {
      setInMessagePage(true);
    } else {
      setInMessagePage(false);
    }
  }, [location]);
  return (
    <div className="h-screen">
      <div className="grid grid-cols-10 h-full">
        <div className="col-span-10 text-white lg:flex py-20 items-centerx justify-center p-6 h-full lg:col-span-3 bg-gray-800 hidden relative h-full">
          <div className="text-center flex flex-col justify-between h-full pb-8">
            <div>
              <div
                className="mb-20 ml-4"
                style={{
                  filter:
                    'invert(1) hue-rotate(170deg) brightness(1.5) contrast(.8)'
                }}>
                <Logo orientation="v" />
              </div>
              <ul className="text-gray-400">
                {isApproved ? (
                  nav?.map((item) => (
                    <li className="py-2 px-2 mb-4 hover:text-white border-b-4 hover:!border-orange-400/80 border-gray-600">
                      <Link to={item.link} className="flex items-center">
                        <span className="mr-2"> {item.icon}</span> {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="py-2 px-2 mb-4 hover:text-white border-b-4 hover:!border-orange-400/80 border-gray-600">
                    <Link to={nav[0]?.link} className="flex items-center">
                      <span className="mr-2"> {nav[0]?.icon}</span>{' '}
                      {nav[0]?.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <ul className="text-gray-400">
                <li className="py-2 px-4 mb-4 hover:text-white border rounded hover:border-orange-300 border-gray-600">
                  <button onClick={onLogout}>Logout</button>
                </li>
              </ul>
              <p className="text-sm text-gray-600 absolute bottom-8">
                Copyright &copy; MIU | Student
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-10 relative lg:col-span-7 flex justify-center h-screen overflow-auto ">
          <div
            className={
              'w-full h-screen overflow-auto p-6 lg:p-12 lg:px-16' +
              (inMessagePage ? ' !p-0' : '')
            }>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
