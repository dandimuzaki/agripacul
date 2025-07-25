import { Search } from '@mui/icons-material';
import React from 'react';

const SearchBar = ({ placeholder }) => {
  const isOrders = location.pathname === '/orders';
  return (
    <div className='flex flex-1'>
      <input className={`bg-white flex-1 rounded-l-full h-9 px-3 ${isOrders ? 'border border-[var(--grey)] border-r-0' : ''}`} type='text' placeholder={placeholder} />
      <button className={`bg-white rounded-r-full h-9 px-3 hover:bg-[var(--light-grey)] ${isOrders ? 'border border-[var(--grey)] border-l-0' : ''}`}><Search /></button>
    </div>
  );
};

export default SearchBar;
