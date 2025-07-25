import React from 'react';
import './Value.css';
import grow_with_us from '../../../assets/grow_with_us.jpg';
import pakcoy from '../../../assets/pakcoy.jpg';
import { CompostOutlined, Diversity1Outlined, HandshakeOutlined, LocalDiningOutlined } from '@mui/icons-material';

const Value = () => {
  return (
    <div className='value-container gap-2 w-full h-full text-[var(--black)]'>
      <div className='image1 value'>
        <img src={pakcoy} className='h-full w-full object-cover' />
      </div>
      <div className='p-2 value1 value flex flex-col justify-center items-start gap-2'>
        <CompostOutlined fontSize='large' />
        <p className='font-bold text-lg'>Sustainable Farming</p>
        <p className='text-sm'>Incorporating organic fertilizer, biological control, and integrating livestock</p>
      </div>
      <div className='p-2 value2 value flex flex-col justify-center items-start gap-2'>
        <LocalDiningOutlined fontSize='large' />
        <p className='font-bold text-lg'>Farm to Table</p>
        <p className='text-sm'>Enjoy vegetables and foods that are crisp, flavorful, and full of nutrients</p>
      </div>
      <div className='p-2 value3 value flex flex-col justify-center items-start gap-2'>
        <HandshakeOutlined fontSize='large' />
        <p className='font-bold text-lg'>Local & Trusted</p>
        <p className='text-sm'>Support the livelihood of smallholder farmers through partnership</p>
      </div>
      <div className='p-2 value4 value flex flex-col justify-center items-start gap-2'>
        <Diversity1Outlined fontSize='large' />
        <p className='font-bold text-lg'>Community Health</p>
        <p className='text-sm'>Promote local nutrition, wellness, and empowerment</p>
      </div>
      <div className='image2 value'>
        <img src={grow_with_us} className='h-full w-full object-cover object-right' />
      </div>
    </div>
  );
};

export default Value;
