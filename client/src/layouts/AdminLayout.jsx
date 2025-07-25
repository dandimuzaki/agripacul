import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar/>
      <Outlet/>
    </>
  );
};

export default AdminLayout;
