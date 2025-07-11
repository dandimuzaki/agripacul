import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import React from 'react';

const SearchBar = () => {
  return (
    <div className='flex flex-1'>
      <input className='bg-white flex-1 rounded-l-md h-9 px-3' type='text' placeholder='Find your fresh food here' />
      <button className='bg-white rounded-r-md h-9 px-3 hover:bg-[var(--light-grey)]'><Search /></button>
    </div>
  );
};

export default SearchBar;
