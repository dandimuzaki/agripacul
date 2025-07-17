import React from 'react';
import './OrderPage.css';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { useCart } from '../../context/CartContext';
import CartButton from '../../Components/CartButton/CartButton';
import OrderCard from '../../Components/OrderCard/OrderCard';
import PageNav from '../../Components/PageNav/PageNav';

const OrderPage = () => {
  const { cart } = useCart();

  return (
    <div className='md:relative md:mt-15 md:ml-75 '>
      <PageNav text="My Orders" />
      <div className='header-order md:hidden'>
        <div className="flex gap-3 flex-1">
          <SearchBar placeholder="Find your transaction" />
          <CartButton cart={cart} />
        </div>
      </div>
      <section className='md:fixed hidden md:flex flex-col gap-3 top-20 left-5 rounded-lg p-3 shadow-[0_0_8px_rgba(0,0,0,0.2)]'>
        <SearchBar placeholder="Find your transaction" />
        <p className='font-bold text-lg'>Status</p>
        <div className='flex flex-col gap-2'>
          <label className='flex gap-3'>
            <input type='radio' />
            All
          </label>
          <label className='flex gap-3'>
            <input type='radio' />
            Pending
          </label>
          <label className='flex gap-3'>
            <input type='radio' />
            Processing
          </label>
          <label className='flex gap-3'>
            <input type='radio' />
            Shipped
          </label>
          <label className='flex gap-3'>
            <input type='radio' />
            Delivered
          </label>
        </div>
        <p className='font-bold'>Choose transaction date</p>
      </section>
      <section className='md:p-5 md:gap-5 p-3 flex flex-col gap-3 pb-22'>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </section>
    </div>
  );
};

export default OrderPage;
