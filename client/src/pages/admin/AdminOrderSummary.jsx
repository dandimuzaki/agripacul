import { Person } from '@mui/icons-material';
import React from 'react';

const AdminOrderSummary = () => {
  return (
    <div className='ml-50 grid grid-cols-12 p-8 gap-3 bg-[var(--light-turquoise)] text-xs'>
      <p className='font-bold text-xl col-span-12'>Dashboard</p>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-3'>
        <p className='font-bold mb-3 text-base'>User Summary</p>
        <div className='flex justify-between'>
          <p>Total Registered Users</p>
          <p>120 <Person fontSize='small'/></p>
        </div>
        <div className='flex justify-between'>
          <p>Total Customers</p>
          <p>120 <Person fontSize='small'/></p>
        </div>
        <div className='flex justify-between'>
          <p>Total Repeat Customers</p>
          <p>120 <Person fontSize='small'/></p>
        </div>
        <div className='flex gap-2 items-center justify-center mt-3'>
          <p className='font-bold text-lg'>14%</p>
          <p>users have ordered</p>
        </div>
      </div>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-4'>
        <p className='font-bold mb-3 text-base'>Performace</p>
      </div>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-5'>
        <p className='font-bold mb-3 text-base'>Revenue Graph</p>
      </div>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-5'>
        <p className='font-bold mb-3 text-base'>Recent Order</p>
      </div>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-7'>
        <p className='font-bold mb-3 text-base'>Today's Overview</p>
      </div>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-4'>
        <p className='font-bold mb-3 text-base'>Top Products</p>
      </div>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-4'>
        <p className='font-bold mb-3 text-base'>Top Categories</p>
      </div>
      <div className='w-full h-full p-3 rounded-lg bg-white col-span-4'>
        <p className='font-bold mb-3 text-base'>Low Stock Alert</p>
      </div>
    </div>
  );
};

export default AdminOrderSummary;
