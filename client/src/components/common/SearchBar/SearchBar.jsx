import { Search } from '@mui/icons-material';
import React from 'react';

const SearchBar = ({ placeholder, keyword, setKeyword, submitFunction }) => {
  const isOrders = location.pathname === '/orders';
  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunction();
    setKeyword('')
  }

  return (
    <form
    onSubmit={handleSubmit}
    className='h-9 flex items-center'
    >
      <input
      className={`bg-white flex-1 rounded-l-full h-full px-3 ${isOrders ? 'border border-[var(--grey)] border-r-0' : ''}`}
      type='text' 
      placeholder={placeholder}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      />
      <button className={`bg-white rounded-r-full h-full px-3 hover:bg-[var(--light-grey)] ${isOrders ? 'border border-[var(--grey)] border-l-0' : ''}`}><Search /></button>
    </form>
  );
};

export default SearchBar;
