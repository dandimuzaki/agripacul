import { useCart } from '@/context/CartContext';
import { Star } from '@mui/icons-material';
import React, { useState } from 'react';
import {formatCurrency} from '../../../utils/format.js';


const ProductCardVertical = ({ product }) => {
  const { title, price, image, amount } = product;
  const { addToCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = (id) => {
    if (isProcessing) return;

    setIsProcessing(true);
    addToCart(id);


    setTimeout(() => setIsProcessing(false), 500);
  };

  const stars = Array(5).fill(null);

  return (
    <div className='rounded-lg bg-white p-3 flex flex-col'>
      <img src={image} alt={title} className='w-full aspect-square object-cover rounded' />
      <div className='flex flex-1 flex-col justify-between'>
        <div>
          <div className='text-yellow-500'>
            {stars.map((_, i) =>
              <Star key={i} fontSize='extra-small'/>)
            }
          </div>
          <h4 className='text-[var(--black)] text-base/6 md:text-lg/6 font-bold'>{title}</h4>
          <h5 className='text-yellow-500 font-bold'>{formatCurrency(price)}<span className='text-gray-500 text-xs'>{`${amount ? ` /${amount}` : ''}`}</span></h5>
        </div>
        <div className='flex justify-end mt-2'>
          <button onClick={() => handleAddToCart(id)} className='
              cursor-pointer w-fit
              rounded-full py-2 px-4
              text-sm font-bold
              bg-[var(--primary)] text-white
              active:bg-[var(--dark-primary)] active:text-white
              active:outline active:outline-[var(--dark-primary)]
              self-end
              '>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardVertical;
