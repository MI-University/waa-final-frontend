import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import s from './Layout.module.css';

const Layout = ({ children = null }) => {
  return (
    <>
      <Header />
      <div className={s.content}>{children ? children : <Outlet />}</div>
      <Footer />
    </>
  );
};

export default Layout;
