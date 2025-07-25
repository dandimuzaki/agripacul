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
    <div className='grid-container gap-2 w-full h-full text-[var(--black)]'>
      <div className='product bg-[var(--teal)] items-start'>
        <img src={vegetables} className='grid-img w-full h-full' />
      </div>
      <div className='food bg-[var(--orange)] grid-item flex items-center'>
        <img src={salad} className='grid-img h-full left-[-20px]' />
        <div className='right-0 absolute p-5'><p className='font-bold text-xl'>Healthy Food<br/>to Brighten<br/>Your Mood</p></div>
      </div>
      <div className='flower bg-[var(--light-green)] grid-item flex justify-center'>
        <img src={chamomile} className='grid-img h-3/4 top-20 left-15' />
        <div className='absolute p-5'><p className='font-bold text-xl text-center'>Flowers to<br />Surprise Your Lover</p></div>
      </div>
      <div className='tool bg-[var(--light-blue)] grid-item flex items-center'>
        <div className='left-0 absolute p-5'><p className='font-bold text-xl'>Gardening Tools to<br />Make Growing Joyful</p></div>
        <img src={tools} className='grid-img h-full right-0' />
      </div>
      <div className='vegetable bg-[var(--light-turquoise)] grid-item flex items-center'>
        <img src={vegetable_bag} className='grid-img h-4/5 top-5' />
        <div className='right-0 absolute p-5'><p className='font-bold text-xl'>Fresh<br />Vegetables<br />to Make You<br />Comfortable</p></div>
      </div>
    </div>
  );
};

export default Banner;
