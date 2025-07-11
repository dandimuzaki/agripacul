import React from 'react';
import BackButton from '../BackButton/BackButton';

const PageNav = ({ path, text }) => {
  return (
    <div className='p-3 sticky w-full top-0 bg-white z-100 md:static md:px-5 md:pb-0 shadow-[0_0_8px_rgba(0,0,0,0.2)] md:shadow-none'>
      <div className='relative h-9 md:h-fit md:flex'>
        <BackButton path={path} />
        <div className='h-9 w-full flex justify-center items-center z-1 md:block md:h-fit md:w-fit'>
          <h2 className='font-bold text-xl text-[var(--black)]'>{text}</h2>
        </div>
      </div>
    </div>
  );
};

export default PageNav;
