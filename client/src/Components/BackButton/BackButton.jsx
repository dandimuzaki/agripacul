import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const BackButton = ({ path }) => {
  return (
    <Link to={path}>
      <button className='z-10 absolute hover:bg-[var(--light-grey)] md:hidden h-9 aspect-square cursor-pointer rounded-md text-black'>
        <ArrowBack />
      </button>
    </Link>
  );
};

export default BackButton;
