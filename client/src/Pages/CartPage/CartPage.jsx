import React from 'react';
import CartCard from '../../Components/CartCard/CartCard';
import PageNav from '../../Components/PageNav/PageNav';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import { CheckBox } from '@mui/icons-material';
import formatCurrency from '../../utils/format';

const CartPage = () => {
  const { groupedCart } = useCart();
  const { checkAll, isAllChecked, totalPrice, groupedCheckout, testCheckout } = useCheckout();

  return (
    <>
      <PageNav path="/" text="My Cart" />
      <div className='p-3 flex flex-col gap-3 md:w-2/3 md:p-5'>
        {groupedCart.map((product) =>
          <CartCard
            key={product.id}
            product={product}
          />
        )}
      </div>
      <div className='bg-white fixed md:fixed bottom-0 md:top-15 md:right-0 md:bottom-auto md:w-1/3 w-full md:py-5 md:pr-5'>
        <div className='bg-white w-full flex justify-between items-center md:items-start p-3 md:rounded-lg shadow-[0_0_8px_rgba(0,0,0,0.2)]'>
          <div className='flex gap-2 items-center'>
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
              <button className='py-2 px-4 rounded-md bg-[var(--teal)] font-bold text-white cursor-pointer active:bg-[var(--dark-teal)]'>Beli <span>{groupedCheckout.length}</span></button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
