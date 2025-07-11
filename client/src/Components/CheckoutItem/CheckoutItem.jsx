import React from 'react';
import lettuce from '../../assets/lettuce.jpg';

const CheckoutItem = ({ product }) => {
  const { title, price, amount, total } = product;
  return (
    <div className='flex gap-2 h-20 relative'>
      <div className='aspect-square h-full'>
        <img className='h-full w-full object-cover rounded-md' src={lettuce} />
      </div>
      <div className='flex flex-col justify-between flex-1'>
        <div>
          <p className='text-bold text-black'>
            {title}
          </p>
          <p className='text-gray-500 text-sm'>Spesifikasi</p>
        </div>
        <div className='flex gap-2 items-center font-bold text-black'>{price}<p className='text-sm text-gray-500'>x<span>{amount}</span> = {total}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
