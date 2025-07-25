import { HomeFilled, LightbulbRounded, Person2Rounded, ShoppingBagRounded } from '@mui/icons-material';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className='fixed flex justify-around bottom-0 py-4 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.2)] z-300 md:hidden'>
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-[var(--teal)] navbar-icon':'text-[var(--black)] navbar-icon'}><HomeFilled /><p className='text-xs'>Home</p></NavLink>
      <NavLink to="/ideas" className={({ isActive }) => isActive ? 'text-[var(--teal)] navbar-icon':'text-[var(--black)] navbar-icon'}><LightbulbRounded /><p className='text-xs'>Ideas</p></NavLink>
      <NavLink to="/orders" className={({ isActive }) => isActive ? 'text-[var(--teal)] navbar-icon':'text-[var(--black)] navbar-icon'}><ShoppingBagRounded /><p className='text-xs'>My Order</p></NavLink>
      <NavLink to="/account" className={({ isActive }) => isActive ? 'text-[var(--teal)] navbar-icon':'text-[var(--black)] navbar-icon'}><Person2Rounded /><p className='text-xs'>Account</p></NavLink>
    </div>
  );
};

export default NavBar;
