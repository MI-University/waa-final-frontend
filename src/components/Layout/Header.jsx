import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation
} from 'react-router-dom';
import Logo from '@components/ui/Logo';
import Button from '@components/common/Button';
import s from './Layout.module.css';
import data from '@data/static.json';
import { FaCross, FaSearch, FaTimes } from 'react-icons/fa';
import { useData } from '@store/providers/Provider';
import UserProfileAvater from '@components/common/UserProfileAvater';

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [showSearch, seShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const nav = data.nav;
  const { isAuthenticated, user, logout } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollListen = useCallback((e) => {
    setScrollActive(window.scrollY > 20);
  }, []);

  const debounce = useMemo(() => {
    let ref = null;
    return (callback, time) => {
      clearTimeout(ref);
      ref = setTimeout(() => callback(), time);
    };
  }, []);

  const onSearchChange = (e) => {
    e.preventDefault();
    debounce(() => setSearchText(e.target.value), 800);
  };

  const onKeyUp = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      navigate('/search', {
        state: {
          searchText
        }
      });
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', scrollListen);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      window.removeEventListener('scroll', scrollListen);
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
    seShowSearch(false);
  }, [location]);

  return (
    <>
      <header
        className={
          s.headerWrapper + (scrollActive ? ' shadow-sm pt-0' : ' pt-0')
        }>
        <nav
          className={
            'max-w-screen-xl px-4 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-6' +
            (scrollActive ? ' sm:!py-4' : '')
          }>
          <ul className="hidden lg:flex col-start-1 col-end-6 text-black-500  items-center">
            {nav.map((item, i) => (
              <li
                key={i}
                className={
                  'px-4 py-2 mx-2 font-bold cursor-pointer animation-hover inline-block relative' +
                  (activeLink === item.link
                    ? ' text-orange-500 animation-active '
                    : ' text-gray-400 hover:text-orange-500 a')
                }>
                {item.name}
              </li>
            ))}
          </ul>
          <div className="col-start-1 lg:col-start-6 col-end-8 flex items-center">
            <div
              className={
                'transition-all duration-500 ' +
                (scrollActive
                  ? ' bg-white rounded-full p-2 lg:p-6 lg:relative'
                  : ' rounded-full p-2 lg:p-6')
              }
              style={
                scrollActive
                  ? {
                      marginBottom: -50,
                      marginTop: -25,
                      boxShadow: '0 20px 20px -20px rgba(0, 0, 0, .3)'
                    }
                  : { marginBottom: -50, marginTop: -25 }
              }>
              <Logo
                orientation="v"
                className={
                  'transition-all duration-500 ' +
                  (scrollActive ? ' !h-12 lg:!h-16' : ' h-12 lg:h-20')
                }
              />
            </div>
          </div>
          <div
            className={
              'col-start-10 col-end-12 font-medium flex justify-end items-center relative ' +
              (scrollActive ? 'mt-0' : 'mt-4 lg:mt-0')
            }>
            <div className="relative pl-6 flex items-center">
              <button
                className={
                  'p-2 py-4 mr-0 text-orange-400 absolute left-0' +
                  (showSearch ? ' left--12' : '')
                }
                onClick={() => seShowSearch(!showSearch)}>
                <FaSearch />
              </button>
              <div
                className={
                  'flex items-center absolute w-60 lg:w-72 transition-all top-16 lg:top-auto right-0 outline-accent ' +
                  (showSearch
                    ? ' opacity-1 visible '
                    : ' opacity-0 invisible !w-0')
                }>
                <FaTimes
                  className="cursor-pointer mr-2 text-accent"
                  onClick={() => seShowSearch(false)}
                />
                <input
                  type="text"
                  placeholder="Search by state, zip"
                  className={
                    'border rounded-full outline-orange-400 w-full z-50 p-2 px-4 '
                  }
                  onChange={onSearchChange}
                  onKeyUp={onKeyUp}
                />
              </div>
              {isAuthenticated ? (
                <div className="ml-4">
                  <UserProfileAvater />
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                      Sign In
                  </Link>
                  <Button outlined>
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <nav className="bg-white fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <li
              className={
                'mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ' +
                (activeLink === 'about'
                  ? '  border-orange-500 text-orange-500'
                  : ' border-transparent')
              }>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </li>
            <li
              className={
                'mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ' +
                (activeLink === 'feature'
                  ? '  border-orange-500 text-orange-500'
                  : ' border-transparent ')
              }>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Feature
            </li>
            <li
              className={
                'mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all ' +
                (activeLink === 'testimoni'
                  ? '  border-orange-500 text-orange-500'
                  : ' border-transparent ')
              }>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              FAQ
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
