import React from 'react';
import './OrderPage.css';
import { useCart } from '../../../context/CartContext';
import PageNav from '../../../components/customer/PageNav/PageNav';
import SearchBar from '../../../components/common/SearchBar/SearchBar';
import CartButton from '../../../components/common/CartButton/CartButton';
import OrderCard from '../../../components/customer/OrderCard/OrderCard';
import { useOrder } from '@/context/OrderContext';


const OrderPage = () => {
  const { cart } = useCart();
  const { orders } = useOrder();

  const handleClick = () => {
    console.log(orders)
  }

  return (
    <div className='md:relative md:mt-15 md:ml-75 '>
      <PageNav text="My Orders" />
      <div className='header-order md:hidden'>
        <div className="flex gap-3 flex-1">
          <SearchBar placeholder="Find your transaction" />
          <CartButton cart={cart} />
        </div>
      </div>
      <section className='bg-white md:fixed hidden md:flex flex-col gap-3 top-20 left-5 rounded-lg p-3'>
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
        {orders && orders.map((order) => (
          <OrderCard key={order._id} order={order}></OrderCard>
        ))}
        <div className='h-10 w-10 bg-orange-500' onClick={handleClick}></div>

      </section>
    </div>
  );
};

export default OrderPage;
