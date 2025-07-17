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
    <div className='p-2 rounded-lg bg-white'>
      <div className='h-full flex flex-col gap-1 justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='img-container aspect-square w-full relative rounded-md'>
            <Link to="/product/1">
              <img className='w-full aspect-square rounded-md object-cover' src={product.image} alt='lettuce' />
            </Link>
            {/*<div className="promo rounded-sm p-1 text-red-500 bg-red-200 absolute top-2 left-2">10% OFF</div>*/}
          </div>
          <h5 className='text-yellow-500 font-bold'>{formatCurrency(price)}<span className='text-gray-500 text-xs'>{`${product.weight ? ` / ${product.weight}` : ''}`}</span></h5>
          <h4 className='text-[var(--black)] text-lg/6 font-bold'>{title}</h4>
        </div>
        <button onClick={() => handleAddToCart(id)} className='
        mt-3
        cursor-pointer w-fit
        rounded-full py-2 px-4
        text-sm font-bold
        bg-[var(--teal)] text-white
        active:bg-[var(--dark-teal)] active:text-white
        active:outline active:outline-[var(--dark-teal)]
        self-end
        '>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
