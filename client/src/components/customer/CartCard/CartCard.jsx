import { Add, CheckBox, Remove } from '@mui/icons-material';
import formatCurrency from '../../../utils/format';
import { useCart } from '../../../context/CartContext';
import { useCheckout } from '../../../context/CheckoutContext';

const CartCard = ({ product }) => {
  const { decreaseQuantity, increaseQuantity } = useCart();
  const { checkedItems, handleCheckout } = useCheckout();
  const { id, title, price, amount } = product;

  const isChecked = checkedItems.includes(id);

  return (
    <div className={'relative flex gap-3 p-2 rounded-lg h-30 shadow-[0_0_8px_rgba(0,0,0,0.2)]'}>
      <div role="checkbox" onClick={() => handleCheckout(id)} type='checkbox' className={`${isChecked?'border-0':'border'} border border-gray-500 h-7 w-7 rounded-md relative self-center cursor-pointer`} >
        <CheckBox fontSize='large' className={`${isChecked?'':'sr-only'} text-[var(--orange)] absolute top-[-4px] left-[-4px]`} />
      </div>
      <div className='aspect-square'>
        <img className='object-cover w-full h-full rounded-md' src={product.image} alt="lettuce" />
      </div>
      <div className='flex flex-col justify-between flex-1'>
        <div className='flex flex-col gap-1'>
          <p className='text-gray-500'>{title}</p>
          <p className='text-[var(--black)] text-lg'>{formatCurrency(price)} <span className='text-sm py-1 px-2 rounded-full text-red-500 bg-red-200'>10% off</span></p>
          <p className='text-sm text-gray-300 line-through'>15.000</p>
        </div>
        <div className='flex justify-end items-center'>
          <button id={id} onClick={() => decreaseQuantity(id)} className='w-6 h-6 border border-[var(--orange)] text-[var(--orange)] rounded-md cursor-pointer'><Remove fontSize='small' /></button>
          <div className='w-8 h-6 flex items-center justify-center'>{amount}</div>
          <button id={id} onClick={() => increaseQuantity(id)} className='w-6 h-6 border border-[var(--orange)] text-[var(--orange)] rounded-md cursor-pointer'><Add fontSize='small' /></button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
