import React from 'react';
import lettuce from '../../../assets/lettuce.jpg';
import { formatCurrency } from '@/utils/format.js';

const CheckoutItem = ({ item }) => {
  const { product, quantity } = item;
  const { title, price, image } = product;
  return (
    <div className='flex gap-2 h-20 relative'>
      <div className='aspect-square h-full'>
        <img className='h-full w-full object-cover rounded-md' src={image} />
      </div>
      <div className='flex flex-col gap-2 flex-1'>
        <p className='text-bold text-black'>
          {title}
        </p>
        <div className='flex gap-2 items-center font-bold text-black'>{formatCurrency(price)}<p className='text-sm text-gray-500'>x<span>{quantity}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
