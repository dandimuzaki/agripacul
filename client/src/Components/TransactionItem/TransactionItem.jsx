import React from 'react';
import tomato from '../../assets/tomato.jpg';

const TransactionItem = () => {
  return (
    <div className='flex gap-3 items-center'>
      <div className='h-20 aspect-square overflow-hidden rounded-md'>
        <img src={tomato} className='object-cover w-full h-full' />
      </div>
      <div className='flex-1'>
        <p className='text-lg font-bold'>Tomato</p>
        <p>3 item x <span>Rp10.000</span></p>
      </div>
      <button className='rounded-full py-1 px-3 text-sm bg-[var(--teal)] text-white font-bold'>Beli Lagi</button>
    </div>
  );
};

export default TransactionItem;
