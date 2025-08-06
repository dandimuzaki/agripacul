import React from 'react';

const OrderModal = () => {
  return (
    <div className='hidden p-8 fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center'>
      <div className='h-full w-full grid grid-cols-2 bg-white rounded-xl p-5 gap-3 text-sm'>
        <div>
          <p className='text-lg font-bold'>Order Details</p>
          <div className=''>
            <p>Nomor Pesanan</p>
            <p>Created At</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 p-2 rounded border border-[var(--grey)]'>
          <p className='text-base font-bold'>Shipping Information</p>
          <div>
            <p>Shipping Method</p>
            <p>Tracking Number</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 p-2 rounded border border-[var(--grey)]'>
          <p className='text-base font-bold'>Buyer Information</p>
          <div>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 p-2 rounded border border-[var(--grey)] row-span-3'>
          <p className='text-base font-bold'>Status Tracker</p>
          <div>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
          </div>
        </div>

        <div className='flex flex-col gap-2 p-2 rounded border border-[var(--grey)] overflow-auto'>
          <p className='text-base font-bold'>Order Items</p>
          <div>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
            <p>Nama Pemesan</p>
            <p>Email Pemesan</p>
          </div>
        </div>
        <div className='flex justify-center gap-2 col-span-2'>
          <button className='px-2 py-1 bg-[var(--red)] active:bg-[var(--dark-red)] text-white font-bold rounded flex gap-2 items-center cursor-pointer h-fit'>Cancel Order</button>
          <button className='px-2 py-1 bg-[var(--primary)] active:bg-[var(--dark-primary)] text-white font-bold rounded flex gap-2 items-center cursor-pointer h-fit'>Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
