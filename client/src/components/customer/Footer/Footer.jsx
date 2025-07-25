import React from 'react';
import './Footer.css';
import logo2 from '../../../assets/logo2.png';
import { Audiotrack, Email, Instagram, LinkedIn, LocationOn, Twitter, WhatsApp, X } from '@mui/icons-material';

const Footer = () => {
  return (
    <div className='footer hidden md:grid gap-5 p-15 text-white'>
      <div className='logo w-full flex justify-center items-center'><img src={logo2} className='w-full' /></div>
      <p className='tagline font-[800] text-2xl '>Let's keep agriculture sustainable!</p>
      <div className='contact flex flex-col gap-2'>
        <p className='font-bold'>Contact</p>
        <a className='flex gap-2 text-sm cursor-pointer'><WhatsApp />+62 853-2409-1088</a>
        <a className='flex gap-2 text-sm cursor-pointer'><Email />agripacul@itb.lpik.org</a>
        <a className='flex gap-2 text-sm cursor-pointer'><LocationOn/>Jl. Cisintok Kadumulya, Cihanjuang, Kec. Parongpong, Kabupaten Bandung Barat</a>
      </div>
      <div className='media flex gap-2 flex-col'>
        <p className='font-bold'>Social Media</p>
        <div className='flex gap-2'>
          <button className='btn-footer'><Instagram/></button>
          <button className='btn-footer'><X/></button>
          <button className='btn-footer'><Audiotrack/></button>
          <button className='btn-footer'><LinkedIn/></button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
