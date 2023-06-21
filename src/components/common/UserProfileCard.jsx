import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Link, redirect } from 'react-router-dom';
import Button from './Button';
import Cookies from 'js-cookie';
import { useData } from '@store/providers/Provider';
import { FaUser } from 'react-icons/fa';

const UserProfile = ({ onClose }) => {
  const { logout, user } = useData();
  const onLogout = async () => {
    logout();
    redirect('/');
  };

  return (
    <div className="nav-item absolute txet-white right-1 top-16 bg-gray-500 p-8 rounded-lg w-80 shadow-xl shadow-gray-800/10">
      <div className="flex justify-end items-center">
        <button
          type="button"
          className="text-xl rounded-full p-2 text-orange-200 hover:text-orange-300 block"
          onClick={onClose}>
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex flex-col justify-center text-center gap-5 items-center border-color border-b-1 pb-4">
        <div className="rounded-full flex items-center text-gray-800 justify-center bg-gray-100 h-16 w-16">
          <FaUser />
        </div>
        <div>
          <p className="font-semibold text-xl text-white">
            {user?.name || 'No Name'}{' '}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-300">
            {user?.role}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-300">
            {user?.email || '-'}
          </p>
        </div>
      </div>
      <div className="text-center">
        <Link
          to="/dashboard"
          className="border-b-2 border-orange-300 text-black hover:border-orange-400 pb-1 mb-2 inline-flex">
          Dashboard
        </Link>
      </div>
      <div className="mt-5 flex justify-center">
        <Button className="px-12 text-sm" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
