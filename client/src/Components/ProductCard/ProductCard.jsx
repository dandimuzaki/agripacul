import lettuce from './../../assets/lettuce.jpg';
import { Link } from 'react-router-dom';
import formatCurrency from '../../utils/format';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, price } = product;
  const [isProcessing, setIsProcessing] = useState(false);

const handleAddToCart = (id) => {
  if (isProcessing) return;

  setIsProcessing(true);
  addToCart(id);


  setTimeout(() => setIsProcessing(false), 500); 
};

  return (
    <div className='p-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
      <div className='h-full flex flex-col gap-1 justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='img-container aspect-square w-full relative rounded-md'>
            <Link to="/product/1">
              <img className='w-full aspect-square rounded-md object-cover' src={lettuce} alt='lettuce' />
            </Link>
            <div className="promo rounded-sm p-1 text-red-500 bg-red-200 absolute top-2 left-2">10% OFF</div>
          </div>
          <h3 className='text-yellow-500 text-sm'>{formatCurrency(price)}<span className='text-gray-500 text-xs'> / 300g</span></h3>
          <h2 className='text-[var(--black)] font-bold'>{title}</h2>
          <p></p>
        </div>
        <button onClick={() => handleAddToCart(id)} className='cursor-pointer items-end self-end w-fit rounded-full py-2 px-3 border border-2 border-[var(--teal)] text-[var(--teal)] text-sm active:border-[var(--dark-teal)] md:hover:bg-[var(--teal)] md:hover:text-white active:text-white font-bold'>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
