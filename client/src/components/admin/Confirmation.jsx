import React from 'react';
import { useProducts } from '../../context/ProductsContext';
import { Close, DeleteOutlined } from '@mui/icons-material';

const Confirmation = ({ type }) => {
  const { isConfirmOpen, onCloseConfirm, submitDelete } = useProducts();
  return (
    <div className={`${isConfirmOpen ? '' : 'hidden'} z-900 p-8 w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex items-center justify-center`}>
      {type == 'delete' ?
        (
          <div className='bg-white p-8 rounded-xl flex flex-col gap-7 items-center relative'>
            <div className='absolute top-2 right-2' onClick={onCloseConfirm}><Close/></div>
            <div className='p-3 bg-[var(--light-red)] text-[var(--red)] rounded-xl'><DeleteOutlined sx={{ fontSize: 50 }} /></div>
            <p>Are you sure you want to delete this product?</p>
            <div className='font-bold flex justify-center gap-3'>
              <button onClick={onCloseConfirm} className='p-2 w-30 text-center bg-[var(--light-grey)] active:bg-[var(--grey)] rounded cursor-pointer'>No, cancel</button>
              <button onClick={submitDelete} className='p-2 w-30 text-center bg-[var(--red)] active:bg-[var(--dark-red)] rounded text-white cursor-pointer'>Yes, delete</button>
            </div>


          </div>) : ''
      }
    </div>
  );
};

export default Confirmation;
