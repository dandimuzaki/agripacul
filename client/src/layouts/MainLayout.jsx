import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/customer/Header/Header';
import SearchBar from '@/components/common/SearchBar/SearchBar';

const MainLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
};

export default MainLayout;
