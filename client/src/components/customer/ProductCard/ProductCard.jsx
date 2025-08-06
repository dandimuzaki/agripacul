import { Link } from 'react-router-dom';
import formatCurrency from '../../../utils/format';
import { useCart } from '../../../context/CartContext';
import { useState } from 'react';
import { Star } from '@mui/icons-material';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, price, amount, image } = product;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = (id) => {
    if (isProcessing) return;

    setIsProcessing(true);
    addToCart(id);


    setTimeout(() => setIsProcessing(false), 500);
  };

  const stars = Array(5).fill(null);

  return (
    <div className='p-3 rounded-lg grid grid-cols-[2fr_3fr] gap-x-3 bg-white'>
      <Link to="/product/1" className='w-full h-full overflow-hidden'>
        <img className='w-full h-full rounded object-cover' src={image} alt={title} />
      </Link>
      <div className='flex flex-col justify-between'>
        <div>
          <div className='text-yellow-500'>
            {stars.map((_, i) =>
              <Star key={i} fontSize='extra-small'/>)
            }
          </div>
          <h4 className='text-[var(--black)] text-base/6 md:text-lg/6 font-bold'>{title}</h4>
          <h5 className='text-yellow-500 font-bold'>{formatCurrency(price)}<span className='text-gray-500 text-xs'>{`${amount ? ` /${amount}` : ''}`}</span></h5>
        </div>
        <div className='flex justify-end'>
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

export default ProductCard;
