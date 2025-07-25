import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/common/NavBar/NavBar';

const NavbarLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default NavbarLayout;
