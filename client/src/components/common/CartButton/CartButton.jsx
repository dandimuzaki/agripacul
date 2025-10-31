import React from 'react';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const CartButton = () => {
  const { cart } = useCart();
  return (
    <Link to='/cart'>
      <button className='btn-icon relative bg-transparent'>
        <ShoppingCartOutlined />
        <span className='counter absolute top-0 right-0 text-white flex bg-[var(--red)] text-xs h-[18px] items-center justify-center rounded-full aspect-square'>{cart?.length || 0}</span>
      </button>
    </Link>
  );
};

export default CartButton;
