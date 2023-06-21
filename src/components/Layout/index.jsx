import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import s from './Layout.module.css';

const Layout = ({ children = null }) => {
  return (
    <div className="header-space">
      <Header />
      <div className={s.content}>{children ? children : <Outlet />}</div>
      <Footer />
    </div>
  );
};

export default Layout;
