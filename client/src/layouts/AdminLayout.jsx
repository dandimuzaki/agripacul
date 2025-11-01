import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className='bg-[var(--background-2)] min-h-screen'>
      <AdminSidebar/>
      <Outlet/>
    </div>
  );
};

export default AdminLayout;
