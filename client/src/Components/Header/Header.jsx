import React from 'react';
import logo from './../../assets/logo.png';
import { EmailOutlined, LightbulbOutlineRounded, LightbulbRounded, NotificationsOutlined, Person2, Person2Outlined } from '@mui/icons-material';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import CartButton from '../CartButton/CartButton';
import { Link, matchPath, useLocation } from 'react-router-dom';

const Header = ({ cart }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCategoryPage = ['/vegetables', '/flowers', '/tools', '/salad'].includes(location.pathname);
  const isCheckout = location.pathname === '/checkout';

  return (
    <div className={isHome || isCategoryPage ?'show header':'hide header'}>
      <Link to='/'>
        <div className='hidden cursor-pointer md:flex md:h-8 md:mr-2 items-center'>
          <img className='h-full' src={logo} />
        </div>
      </Link>
      <div className={isCheckout?'hidden':'gap-3 md:flex-row md:flex flex-1'}>
        <div className="flex gap-3 flex-1">
          <SearchBar />
          <CartButton cart={cart} />
        </div>

        <div className="hidden md:flex items-center justify-center h-8 gap-2">
          <button className='btn-icon'><EmailOutlined /></button>
          <button className='btn-icon'><NotificationsOutlined /></button>
        </div>
        <a className='btn-icon md:flex items-center p-2 gap-1 hidden'><LightbulbOutlineRounded />Ideas</a>
        <a className='btn-icon md:flex items-center p-2 gap-1 hidden'><Person2Outlined /> Dandi</a>
      </div>
    </div>
  );
};

export default Header;
