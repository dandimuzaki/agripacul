import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useCheckout } from '../../../context/CheckoutContext';
import { CheckBox } from '@mui/icons-material';
import formatCurrency from '../../../utils/format';
import CartCard from '../../../components/customer/CartCard/CartCard';
import PageNav from '../../../components/customer/PageNav/PageNav';
import { useAuth } from '@/context/AuthContext';
import { useAddress } from '@/context/AddressContext';

const CartPage = () => {
  const { cart } = useCart();
  const { checkedItems, checkAll, isAllChecked, totalPrice, testCheckout } = useCheckout();
  const {addressList} = useAddress()

  const handleClick = () => {
    console.log(addressList);
  }

  return (
    <div className='md:mt-15'>
      <PageNav path="/" text="My Cart" />
      <div className='p-3 flex flex-col gap-3 md:w-2/3 md:p-5 pb-20 md:pb-3'>
        <div className='gap-2 items-center hidden md:flex p-3 rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)]'>
          <div role="checkbox" onClick={checkAll} type='checkbox' className={`${isAllChecked?'border-0':'border'} border border-gray-500 h-7 w-7 rounded-md relative cursor-pointer`} >
            <CheckBox fontSize='large' className={`${isAllChecked?'':'sr-only'} text-[var(--orange)] absolute top-[-4px] left-[-4px]`} />
          </div>
          <span>Semua</span>
        </div>
        {cart.map((item, i) => <CartCard key={i} item={item} />)}
      </div>
      <div className='bg-white fixed bottom-0 md:top-15 md:right-0 md:bottom-auto md:w-1/3 w-full md:py-5 md:pr-5'>
        <div className='bg-white w-full flex justify-between items-center md:items-start p-3 md:rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)]'>
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
        <div className='w-20 h-20 bg-green-500' onClick={handleClick}></div>
      </div>
    </div>
  );
};

export default CartPage;
