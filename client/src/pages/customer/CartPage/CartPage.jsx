import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useCheckout } from '../../../context/CheckoutContext';
import { CheckBox } from '@mui/icons-material';
import { formatCurrency } from '../../../utils/format.js';
import CartCard from '../../../components/customer/CartCard/CartCard';
import PageNav from '../../../components/customer/PageNav/PageNav';
import { useAuth } from '@/context/AuthContext';
import { useAddress } from '@/context/AddressContext';
import SectionTitle from '@/components/customer/SectionTitle';

const CartPage = () => {
  const { cart } = useCart();
  const { checkedItems, checkAll, isAllChecked, totalPrice } = useCheckout();

  return (
    <div className='md:px-12 p-4 md:py-6 mt-15 grid md:grid-cols-[1fr_350px] items-start gap-4'>
      <div className='order-3 fixed bottom-0 md:top-19 md:bottom-auto md:sticky'>
        <div className='bg-white w-full flex justify-between items-center md:items-start p-3 md:rounded-lg'>
          <div className='flex gap-2 items-center md:hidden'>
            <div role="checkbox" onClick={checkAll} type='checkbox' className={`${isAllChecked?'border-0':'border'} border border-gray-500 h-7 w-7 rounded-md cursor-pointer`} >
              <CheckBox fontSize='large' className={`${isAllChecked?'':'sr-only'} text-[var(--orange)]`} />
            </div>
            <span>Semua</span>
          </div>
          <div className='flex gap-2 items-center'>
            <p className='font-bold text-black'>
              {formatCurrency(totalPrice)}
            </p>
            <Link to="/checkout">
              <button className='py-2 px-4 rounded-md bg-[var(--primary)] font-bold text-white cursor-pointer active:bg-[var(--dark-primary)]'>Beli <span>{checkedItems.length}</span></button>
            </Link>
          </div>
        </div>
      </div>
      <div className='order-1 col-span-2'>
        <SectionTitle title='My Cart'/>
      </div>
      <div className='order-2 grid gap-4'>
        <div className='gap-2 items-center hidden md:flex p-3 rounded-lg bg-white'>
          <div role="checkbox" onClick={checkAll} type='checkbox' className={`${isAllChecked?'border-0':'border'} border border-gray-500 h-7 w-7 rounded-md relative cursor-pointer`} >
            <CheckBox fontSize='large' className={`${isAllChecked?'':'sr-only'} text-[var(--orange)] absolute top-[-4px] left-[-4px]`} />
          </div>
          <span>Semua</span>
        </div>

        {cart.map((item, i) => <CartCard key={i} item={item} />)}
      </div>
    </div>
  );
};

export default CartPage;
