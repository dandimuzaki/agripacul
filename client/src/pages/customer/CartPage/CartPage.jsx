import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useCheckout } from '../../../context/CheckoutContext';
import { CheckBox } from '@mui/icons-material';
import { formatCurrency } from '../../../utils/format.js';
import CartCard from '../../../components/customer/CartCard/CartCard';
import SectionTitle from '@/components/customer/SectionTitle';
import CartTable from '@/components/customer/CartTable';

const CartPage = () => {
  const { cart } = useCart();
  const { checkedItems, checkAll, isAllChecked, totalPrice } = useCheckout();

  const MemoizedCartTable = React.memo(CartTable);

  return (
    <div className='md:px-12 p-4 md:py-6 mt-15 grid md:grid-cols-[1fr_350px] items-start gap-4'>
      <div className='order-3 w-full fixed bottom-0 left-0 md:hidden'>
        <div className='bg-white w-full flex justify-between items-center md:items-start p-3 md:rounded-lg'>
          <div className='flex gap-2 items-center'>
            <div role="checkbox" onClick={checkAll} type='checkbox' className={`${isAllChecked?'border-0':'border'} border border-gray-500 h-7 w-7 rounded-md cursor-pointer`} >
              <CheckBox fontSize='large' className={`${isAllChecked?'':'sr-only'} text-[var(--orange)]`} />
            </div>
            <span>Select All</span>
          </div>
          <div className='flex gap-2 items-center'>
            <p className='font-bold text-black'>
              {formatCurrency(totalPrice)}
            </p>
            <Link to="/checkout">
              <button className='py-2 px-4 rounded-md bg-[var(--primary)] font-bold text-white cursor-pointer active:bg-[var(--dark-primary)]'>Beli <span>{checkedItems?.length}</span></button>
            </Link>
          </div>
        </div>
      </div>
      <div className='order-1 grid gap-4'>
        <SectionTitle title='My Cart'/>
        <MemoizedCartTable/>
      </div>

      <div className='sticky top-33 order-4 p-6 rounded-lg bg-white grid gap-4'>
        <h2 className='text-xl font-bold'>Shopping Summary</h2>
        <div className='flex justify-between items-center'>
          <p className='font-semibold'>Total price</p>
          <p>{formatCurrency(totalPrice || 0)}</p>
        </div>
        <Link to="/checkout">
          <button className='w-full py-2 px-4 rounded-md bg-[var(--primary)] font-bold text-white cursor-pointer active:bg-[var(--dark-primary)]'>Checkout Now</button>
        </Link>
      </div>

      <div className='order-2 grid gap-4 md:hidden'>
        {cart.map((item, i) => <CartCard key={i} item={item} />)}
      </div>
    </div>
  );
};

export default CartPage;
