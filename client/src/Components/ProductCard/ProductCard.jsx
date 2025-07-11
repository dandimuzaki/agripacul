import lettuce from './../../assets/lettuce.jpg';
import { Link } from 'react-router-dom';
import formatCurrency from '../../utils/format';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, price } = product;

  return (
    <div>
      <div className='h-full flex flex-col gap-1 justify-between'>
        <div className='flex flex-col gap-1'>
          <div className='img-container aspect-square w-full relative rounded-md'>
            <Link to="/product/1">
              <img className='w-full aspect-square rounded-md object-cover' src={lettuce} alt='lettuce' />
            </Link>
            <div className="promo rounded-sm p-1 text-red-500 bg-red-200 absolute top-2 left-2">10% OFF</div>
          </div>
          <h3 className='text-yellow-500 text-sm'>{formatCurrency(price)}<span className='text-gray-500 text-xs'> / 300g</span></h3>
          <h2 className='text-[var(--black)] truncate font-bold'>{title}</h2>
          <p></p>
        </div>
        <button onClick={() => addToCart(id)} className='cursor-pointer items-end w-fit rounded-full py-2 px-3 border border-2 border-[var(--teal)] text-[var(--black)]] text-sm active:border-[var(--dark-teal)] hover:bg-[var(--teal)] hover:text-white active:bg-[var(--dark-teal)] active:text-white active:font-bold'>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
