import React from 'react';
import './OrderCard.css';
import lettuce from '../../../assets/lettuce.jpg';

const OrderCard = () => {
  return (
    <div className='rounded-lg order-card w-full p-3 shadow-[0_0_8px_rgba(0,0,0,0.2)] gap-3'>
      <div className='order-info flex justify-between text-sm items-center'>
        <div>
          <p className='font-bold'>Order Placed</p>
          <p className=''>18 Juli 2025</p>
        </div>
        <p className='py-1 px-2 w-fit h-fit rounded-md text-green-500 bg-green-200'>
          Selesai
        </p>
      </div>
      <div className='order-item flex gap-3'>
        <div className='h-25 aspect-square overflow-hidden rounded-md'>
          <img src={lettuce} className='aspect-square object-cover' />
        </div>
        <div className='flex justify-between flex-col'>
          <div>
            <p className='font-bold text-lg'>Lettuce</p>
            <p className='text-sm'>3 item x <span>Rp 10.000</span></p>
          </div>
          <p className='text-sm mt-3'>+2 produk lainnya</p>
        </div>
      </div>
      <div className='order-total flex gap-5 justify-end items-end flex-col'>
        <div>
          <p className='text-sm'>Total Belanja</p>
          <p className='font-bold'>Rp 30.000</p>
        </div>
        <div className='order-btn flex gap-3 justify-end items-end'>
          <button className='hidden md:block font-bold py-1 px-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full'>
            See Detail
          </button>
          <button className='font-bold py-1 px-3 bg-[var(--primary)] border-2 border-[var(--primary)] text-white rounded-full'>
            Buy Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
