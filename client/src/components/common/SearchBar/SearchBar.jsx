import { Search } from '@mui/icons-material';
import React from 'react';

const SearchBar = ({ placeholder }) => {
  const isOrders = location.pathname === '/orders';
  return (
    <>
      <input className={`bg-white flex-1 rounded-l-full h-full px-3 ${isOrders ? 'border border-[var(--grey)] border-r-0' : ''}`} type='text' placeholder={placeholder} />
      <button className={`bg-white rounded-r-full h-full px-3 hover:bg-[var(--light-grey)] ${isOrders ? 'border border-[var(--grey)] border-l-0' : ''}`}><Search /></button>
    </>
  );
};

export default SearchBar;
