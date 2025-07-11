import React from 'react';
import './Category.css';
import { NavLink } from 'react-router-dom';

const Category = () => {
  return (
    <div className='flex gap-2 overflow-auto no-scrollbar'>
      <NavLink to='/' className={({ isActive }) => isActive? 'category-active' : 'category'}>All</NavLink>
      <NavLink to='/vegetables' className={({ isActive }) => isActive? 'category-active' : 'category'}>Vegetables</NavLink>
      <NavLink to='/salad' className={({ isActive }) => isActive? 'category-active' : 'category'}>Salad</NavLink>
      <NavLink to='/flowers' className={({ isActive }) => isActive? 'category-active' : 'category'}>Flowers</NavLink>
      <NavLink to='/tools' className={({ isActive }) => isActive? 'category-active' : 'category'}>Gardening Tools</NavLink>
    </div>
  );
};

export default Category;
