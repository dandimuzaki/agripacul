import React from 'react';
import './Banner.css';
import { ArrowOutwardTwoTone, ShoppingCartOutlined } from '@mui/icons-material';
import vegetables from '../../../assets/vegetables.png';
import salad from '../../../assets/salad.png';
import chamomile from '../../../assets/chamomile.png';
import vegetable_bag from '../../../assets/vegetable_bag.png';
import tools from '../../../assets/tools.png';

const Banner = () => {
  return (
    <div className='grid grid-cols-6 grid-rows-[minmax(150px,1fr)]'>
      <div className='bg-[var(--primary)] h-full w-full'>Apa ya</div>
      <div className='bg-[var(--accent)] h-full w-full'>Apa ya</div>
      <div className='bg-[var(--primary-dark)] h-full w-full'>Apa ya</div>
      <div className='bg-[var(--primary-light)] h-full w-full'>Apa ya</div>
      <div className='bg-[var(--neutral-900)] h-full w-full'>Apa ya</div>
      <div className='bg-[var(--neutral-700)] h-full w-full'>Apa ya</div>
      <div className='bg-[var(--neutral-100)] h-full w-full'>Apa ya</div>
      <div className='bg-[var(--success)] h-full w-full'>Success</div>
      <div className='bg-[var(--error)] h-full w-full'>Error</div>
    </div>
  );
};

export default Banner;
