import React, { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import { ArrowDropDown, EmailOutlined, NotificationsOutlined, Person2, Person2Outlined } from '@mui/icons-material';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../../common/SearchBar/SearchBar';
import CartButton from '../../common/CartButton/CartButton';
import { useAuth } from '@/context/AuthContext';
import { getFirstName } from '@/utils/format';
import ProfileButton from '../ProfileButton';
import Categories from '../Categories';
import { useProduct } from '@/context/ProductContext';

const Header = ({ cart }) => {
  const location = useLocation();
  const isCategoryPage = ['/', '/vegetables', '/flowers', '/tools', '/salad'].includes(location.pathname);
  const isCheckout = location.pathname === '/checkout';
  const isAdmin = ['/admin', '/signup', '/login'].includes(location.pathname);
  const { accessToken, user } = useAuth();
  const { keyword, setKeyword, searchProduct, debounceKeyword } = useProduct();

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
    <div className={`${isAdmin ? 'hidden' : 'header'} ${isCategoryPage ? '' : 'not-home md:sticky hidden'} ${scrolled ? 'scrolled' : ''}`}    >
      <Link to='/'>
        <div className='cursor-pointer h-9'>
          <img className='h-full' src={logo} />
        </div>
      </Link>

      <nav className={`${isCheckout ? 'hidden' : 'lg:flex'} hidden items-center justify-center gap-2`}>
        <Link to='/'>
          <button className={`font-bold cursor-pointer rounded-md text-white h-9 px-4 py-2 ${scrolled ? 'hover:border-white active:bg-[var(--light-grey)] border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] active:border-[var(--light-grey)] active:text-[var(--primary)]':'hover:bg-[var(--primary)] active:border-[var(--dark-primary)] border-white active:bg-[var(--dark-primary)] active:text-white'}`}>Home</button>
        </Link>
        <Link to='/about'>
          <button className={`font-bold cursor-pointer rounded-md text-white h-9 px-4 py-2 ${scrolled ? 'hover:border-white active:bg-[var(--light-grey)] border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] active:border-[var(--light-grey)] active:text-[var(--primary)]':'hover:bg-[var(--primary)] active:border-[var(--dark-primary)] border-white active:bg-[var(--dark-primary)] active:text-white'}`}>About Us</button>
        </Link>
        <Categories/>
      </nav>
      <div className={`${isCheckout?'hidden':'gap-2 md:flex-row md:flex'} hidden`}>
        <div className='h-9 hidden md:flex items-center min-w-xs'>
          <SearchBar placeholder="Find fresh vegetables and foods here" keyword={keyword} setKeyword={setKeyword} submitFunction={() => searchProduct(keyword)} />
        </div>
        <CartButton cart={cart} />
      </div>
      <div className={`${isCheckout ? 'hidden' : 'gap-2 md:flex-row md:flex'} hidden items-center justify-center h-9 gap-2`}>
        {user ?
          (
            <>
              <ProfileButton text={`Hi, ${getFirstName(user.name)}!`}/>
            </>
          )
          : (<>
            <button
              className={`shrink-0 font-bold cursor-pointer rounded-full h-full px-4 bg-[var(--primary)] 
              ${scrolled ? 'bg-white text-[var(--primary)] hover:text-white hover:bg-[var(--dark-primary)]'
              :'text-white hover:bg-[var(--dark-primary)]'}`}>
              <Link to='/signup'>
              Sign Up
              </Link>
            </button>
            <button
              className={`shrink-0 font-bold cursor-pointer border-2 rounded-full text-white h-full px-4 text-[var(--primary)] 
              ${scrolled ? 'bg-transparent text-[var(--primary)] hover:text-white hover:bg-[var(--dark-primary)]'
              :'border-white hover:bg-white hover:text-[var(--primary)]'}`}>
              <Link to='/login'>
                Log In
              </Link>
            </button>
          </>)}
      </div>
      <div className='flex gap-3 md:hidden'>
        {user ?
          (
            <button className={`font-bold cursor-pointer rounded-full text-white h-9 px-4 py-2 text-[var(--primary)] ${scrolled ? 'hover:border-white active:bg-[var(--light-grey)] border-[var(--primary)] hover:bg-white hover:text-[var(--primary)] active:border-[var(--light-grey)] active:text-[var(--primary)]':'hover:bg-[var(--primary)] active:border-[var(--dark-primary)] border-white active:bg-[var(--dark-primary)] active:text-white'}`}>Hi {getFirstName(user.name)}</button>
          )
          : (<><Link to='/signup'>
            <button className={`shrink-0 font-bold cursor-pointer rounded-full h-full px-4 bg-[var(--primary)] ${scrolled ? 'bg-white text-[var(--primary) active:bg-[var(--light-grey)] text-[var(--primary)]':'text-white active:bg-[var(--dark-primary)]'}`}>Sign Up</button>
          </Link></>)}
        <CartButton/>
      </div>
    </div>
  );
};

export default Header;
