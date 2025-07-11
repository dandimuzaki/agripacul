import { Star } from '@mui/icons-material';
import React from 'react';
import CartButton from '../../Components/CartButton/CartButton';
import lettuce from '../../assets/lettuce.jpg';
import BackButton from '../../Components/BackButton/BackButton';

const ProductPage = () => {
  return (
    <div>
      <div className='p-3 bg-white flex justify-between bg-white sticky top-0'>
        <BackButton />
        <CartButton />
      </div>
      <div className='p-3 flex flex-col gap-3'>
        <div className='w-full'>
          <img className='w-full aspect-square rounded-lg object-cover' src={lettuce} alt='lettuce' />
        </div>
        <div className='flex justify-between flex-1'>
          <div className='py-2 px-4 rounded-full bg-[var(--teal)] text-white text-sm'>Vegetables</div>
          <div className='flex gap-2 text-orange-500 text-sm items-center'>
            <Star />
            <span>4.8</span>
          </div>
        </div>
        <div className='flex justify-between w-full items-center'>
          <h2 className='text-2xl font-bold text-[var(--black)]'>Lettuce</h2>
          <div className='flex flex-col items-end'>
            <p className='text-sm text-gray-300 line-through'>Rp15.000</p>
            <p className='text-md text-orange-500'>Rp10.000<span className='text-md'>/300g</span></p>
          </div>
        </div>
        <h3 className='text-[var(--black)] font-bold'>Details</h3>
        <p className='text-gray-500 text-sm'>
        Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.
        Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.
        Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.
        Selada adalah sayuran yang kaya akan vitamin dan serat yang bermanfaat bagi kesehatan tubuh.

        </p>
      </div>
    </div>
  );
};

export default ProductPage;
