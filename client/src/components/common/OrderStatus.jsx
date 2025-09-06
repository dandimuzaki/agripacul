import { formatDate } from '@/utils/format';
import React from 'react';

const OrderStatus = ({ date, text, description, place }) => {
  return (
    <div className='flex gap-4'>
      <div className='flex flex-col items-center justify-center relative'>
        <div className={`${(place == 'head') ? 'bg-none' : 'bg-[var(--primary)]'} 'flex-1 w-1 h-full`}></div>
        <div className={`${(place == 'tail') ? 'bg-none' : 'bg-[var(--primary)]'} 'flex-1 w-1 h-full`}></div>
        <div className='h-3 w-3 rounded-full bg-[var(--primary)] absolute top-[50%] left-[50%] -translate-1/2'></div>
      </div>
      <div className='flex-1 grid gap-1 my-2'>
        <p className='font-bold'>{text} {formatDate(date)}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default OrderStatus;
