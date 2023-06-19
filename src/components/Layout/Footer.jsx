import React from 'react';
import Facebook from '../../assets/icons/facebook.svg';
import Twitter from '../../assets/icons/twitter.svg';
import Instagram from '../../assets/icons/instagram.svg';
import Logo from '../ui/Logo';
import s from './Layout.module.css';

const Footer = () => {
  return (
    <div className={s.footerWrapper}>
      <div className="text-center lg:max-w-screen-xl flex justify-center flex-col w-full mx-auto px-6 sm:px-8 lg:px-16 gridx grid-rows-2 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-center ">
          <div
            className=" w-auto mb-6"
            // style={{
            //   filter:
            //     'invert(1) hue-rotate(188deg) brightness(1.2) contrast(1.5)'
            // }}
          >
            <Logo orientation="v" />
          </div>
          <div className="flex mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <img src={Facebook} className="h-6 w-6 text-accent" alt="" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <img src={Twitter} className="h-6 w-6" alt="" />
            </div>
            <div className="mx-2 bg-white rounded-full items-center justify-center flex p-2 shadow-md">
              <img src={Instagram} className="h-6 w-6" alt="" />
            </div>
          </div>
        </div>

        <div className="text-center text-sm flex justify-center flex flex-col mb-6">
          <ul className="text-gray-500 flex flex-wrap justify-center">
            <li className="my-2 px-4 hover:text-orange-500 cursor-pointer transition-all">
              Home
            </li>
            <li className="my-2 px-4 hover:text-orange-500 cursor-pointer transition-all">
              FAQ{' '}
            </li>
            <li className="my-2 px-4 hover:text-orange-500 cursor-pointer transition-all">
              About Us{' '}
            </li>
            <li className="my-2 px-4 hover:text-orange-500 cursor-pointer transition-all">
              Privacy Policy{' '}
            </li>
            <li className="my-2 px-4 hover:text-orange-500 cursor-pointer transition-all">
              Terms of Service{' '}
            </li>
          </ul>
        </div>

        <p className="text-gray-400 text-sm">
          ©{new Date().getFullYear()} - MyHome
        </p>
      </div>
    </div>
  );
};

export default Footer;
