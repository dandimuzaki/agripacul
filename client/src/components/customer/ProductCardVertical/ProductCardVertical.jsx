import { useCart } from '@/context/CartContext';
import { Add, AddShoppingCart, Star, StarBorder, StarHalf } from '@mui/icons-material';
import React, { useState } from 'react';
import { formatCurrency } from '../../../utils/format.js';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton.jsx';


const ProductCardVertical = ({ product, loading }) => {
  const { title, price, image, amount, _id, rating, sold } = product;
  const { addToCart } = useCart();

  const half = rating - parseInt(rating);
  const ratingArr = new Array(5);
  for (let i=0; i<parseInt(rating); i++) {
    ratingArr[i] = 1;
  }
  ratingArr[parseInt(rating)] = half;
  for (let i=parseInt(rating)+1; i<5; i++) {
    ratingArr[i] = 0;
  }

  if (loading) return (
    <div className='rounded-lg bg-white p-2 grid gap-2'>
      <Skeleton className='w-full aspect-square rounded-lg'/>
      <Skeleton className='w-full h-8'/>
      <div className='flex gap-2'>
        <Skeleton className='flex-1 h-8'/>
        <Skeleton className='rounded-full w-8 h-8'/>
      </div>
    </div>
  );

  return (
    <div className='rounded-lg bg-white p-2 flex flex-col gap-2'>
      <Link to={`/product/${_id}`}>
        {
          loading ? (<div className='w-full aspect-square rounded-lg bg-[var(--light-grey)]'></div>) :

            <img src={image} alt={title} className='w-full aspect-square object-cover rounded-lg' />
        }
      </Link>
      <div className='flex flex-1 flex-col justify-between'>
        <div className='grid gap-1'>
          <div className='text-yellow-500'>
            {ratingArr.map((r, index) => r == 1 ? <Star key={index} fontSize='extra-small'/> : r == 0 ? <StarBorder fontSize='extra-small'/> : <StarHalf fontSize='extra-small'/>)}
          </div>
          <h4 className='text-[var(--black)] text-base/6 font-bold'>{title}</h4>
        </div>
        <div className='items-end flex justify-between mt-2'>
          <h5 className='text-yellow-500 font-bold text-lg'>{formatCurrency(price)}<span className='text-gray-500 text-xs'>{`${amount ? ` /${amount}` : ''}`}</span></h5>
          <button onClick={() => addToCart(_id)} className='
              cursor-pointer w-fit
              rounded-full p-2
              text-sm font-bold
              bg-[var(--primary)] text-white
              active:bg-[var(--dark-primary)] active:text-white
              active:outline active:outline-[var(--dark-primary)]
              self-end
              '><AddShoppingCart/></button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardVertical;
