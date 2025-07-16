import React, { useEffect, useState } from 'react';
import logo from './../../assets/logo.png';
import { ArrowDropDown, EmailOutlined, LightbulbOutlineRounded, LightbulbRounded, NotificationsOutlined, Person2, Person2Outlined } from '@mui/icons-material';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import CartButton from '../CartButton/CartButton';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ cart }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCategoryPage = ['/', '/vegetables', '/flowers', '/tools', '/salad'].includes(location.pathname);
  const isCheckout = location.pathname === '/checkout';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header ${isCategoryPage ? '' : 'not-home md:sticky hidden'} ${scrolled ? 'scrolled' : ''}`}    >
      <Link to='/'>
        <div className='hidden cursor-pointer md:flex md:h-8 md:mr-2 items-center'>
          <img className='h-full' src={logo} />
        </div>
      </Link>
      <nav className={`${isCheckout ? 'hidden' : 'lg:flex'} hidden items-center justify-center gap-2 h-9`}>
        <button className={`font-bold cursor-pointer rounded-full text-white h-full px-4 text-[var(--teal)] ${scrolled ? 'hover:border-white active:bg-[var(--light-grey)] border-[var(--teal)] hover:bg-white hover:text-[var(--teal)] active:border-[var(--light-grey)] active:text-[var(--teal)]':'active:border-[var(--dark-teal)] border-white active:bg-[var(--dark-teal)] active:text-white'}`}>Ideas</button>
        <button className={`shrink-0 font-bold cursor-pointer rounded-full text-white h-full px-4 text-[var(--teal)] ${scrolled ? 'hover:border-white active:bg-[var(--light-grey)] border-[var(--teal)] hover:bg-white hover:text-[var(--teal)] active:border-[var(--light-grey)] active:text-[var(--teal)]':'active:border-[var(--dark-teal)] border-white active:bg-[var(--dark-teal)] active:text-white'}`}>About Us</button>
        <button className={`flex gap-2 items-center justify-center font-bold cursor-pointer rounded-full text-white h-full pl-4 pr-2 text-[var(--teal)] ${scrolled ? 'hover:border-white active:bg-[var(--light-grey)] border-[var(--teal)] hover:bg-white hover:text-[var(--teal)] active:border-[var(--light-grey)] active:text-[var(--teal)]':'active:border-[var(--dark-teal)] border-white active:bg-[var(--dark-teal)] active:text-white'}`}>Explore<ArrowDropDown/></button>
      </nav>
      <div className={isCheckout?'hidden':'gap-2 md:flex-row md:flex flex-1'}>
        <div className="flex gap-3 flex-1">
          <SearchBar />
          <CartButton cart={cart} />
        </div>

        <div className="hidden lg:flex items-center justify-center h-9 gap-2">
          <button className='btn-icon'><EmailOutlined /></button>
          <button className='btn-icon'><NotificationsOutlined /></button>
        </div>
        <div className="hidden md:flex items-center justify-center h-9 gap-2">
          <button className={`shrink-0 font-bold cursor-pointer rounded-full h-full px-4 bg-[var(--teal)] ${scrolled ? 'bg-white text-[var(--teal) active:bg-[var(--light-grey)] text-[var(--teal)]':'text-white active:bg-[var(--dark-teal)]'}`}>Sign Up</button>
          <button className={`shrink-0 font-bold cursor-pointer border-2 rounded-full text-white h-full px-4 text-[var(--teal)] ${scrolled ? 'hover:border-white active:bg-[var(--light-grey)] border-[var(--teal)] hover:bg-white hover:text-[var(--teal)] active:border-[var(--light-grey)] active:text-[var(--teal)]':'active:border-[var(--dark-teal)] border-white active:bg-[var(--dark-teal)] active:text-white'}`}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
