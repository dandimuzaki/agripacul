import { AccountCircleOutlined, AnalyticsOutlined, AssignmentOutlined, BarChart, SettingsOutlined, ShoppingBasketOutlined, StoreOutlined } from '@mui/icons-material';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='fixed top-0 w-50 h-screen bg-[var(--primary)] text-white'>
      <Link
        to='/admin'
        className='bg-[var(--primary)] font-bold px-5 py-2 flex gap-2 items-center'
      >
        <p>Agripacul</p>
      </Link>
      <NavLink
        to='/admin/overview'
        className={({ isActive }) => `${isActive ? 'bg-[var(--dark-primary)] font-bold' : 'bg-[var(--primary]'} px-5 py-2 flex gap-2 items-center`
        }
      >
        <BarChart/> Overview
      </NavLink>
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
        to='/admin/users'
        className={({ isActive }) => `${isActive ? 'bg-[var(--dark-primary)] font-bold' : 'bg-[var(--primary]'} px-5 py-2 flex gap-2 items-center`}
      ><AccountCircleOutlined/> User
      </NavLink>
      <NavLink
        to='/'
        className={({ isActive }) => `${isActive ? 'bg-[var(--dark-primary)] font-bold' : 'bg-[var(--primary]'} px-5 py-2 flex gap-2 items-center`}
      ><StoreOutlined/> Store
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
