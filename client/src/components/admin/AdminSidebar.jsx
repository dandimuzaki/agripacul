import { AnalyticsOutlined, AssignmentOutlined, SettingsOutlined, ShoppingBasketOutlined } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='fixed top-0 w-50 h-screen bg-[var(--primary)] text-white'>
      <div
        to='/admin/'
        className='bg-[var(--primary)] font-bold px-5 py-2 flex gap-2 items-center'
      >
        <p>Agripacul</p>
      </div>
      <NavLink
        to='/admin/products'
        className={({ isActive }) => `${isActive ? 'bg-[var(--dark-primary)] font-bold' : 'bg-[var(--primary]'} px-5 py-2 flex gap-2 items-center`
        }
      >
        <ShoppingBasketOutlined/> Product
      </NavLink>
      <NavLink
        to='/admin/orders'
        className={({ isActive }) => `${isActive ? 'bg-[var(--dark-primary)] font-bold' : 'bg-[var(--primary]'} px-5 py-2 flex gap-2 items-center`}
      ><AssignmentOutlined/> Order
      </NavLink>
      <NavLink
        to='/admin/summary'
        className={({ isActive }) => `${isActive ? 'bg-[var(--dark-primary)] font-bold' : 'bg-[var(--primary]'} px-5 py-2 flex gap-2 items-center`}
      >
        <AnalyticsOutlined/> Order Summary
      </NavLink>
      <NavLink
        to='/admin/settings'
        className={({ isActive }) => `${isActive ? 'bg-[var(--dark-primary)] font-bold' : 'bg-[var(--primary]'} px-5 py-2 flex gap-2 items-center`}
      ><SettingsOutlined/> Settings
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
