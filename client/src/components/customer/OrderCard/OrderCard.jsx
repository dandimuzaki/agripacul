import React from 'react';
import './OrderCard.css';
import { formatCurrency, formatDate, capitalize } from '../../../utils/format';
import { deleteOrderByAdmin } from '@/services/orderService';
import { useOrder } from '@/context/OrderContext';

const OrderCard = ({ order }) => {
  const { createdAt, status, totalBill, itemsSnapshot, cancel, _id } = order;
  const { seeOrderDetail, requestCancelOrder } = useOrder();

  return (
    <div className='bg-white rounded-lg order-card w-full p-3 gap-3'>
      <div className='order-info flex justify-between text-sm items-center'>
        <div>
          <p className='font-bold'>Order Placed</p>
          <p className=''>{formatDate(createdAt)}</p>
        </div>
        <p className='py-1 px-2 w-fit h-fit rounded-md text-green-500 bg-green-200'>
          {capitalize(status)}
        </p>
      </div>
      <div className='order-item flex gap-3'>
        <div className='h-25 aspect-square overflow-hidden rounded-md'>
          {itemsSnapshot[0]?.product?.image
            ? <img src={itemsSnapshot[0].product.image} className='aspect-square object-cover' />
            : <div className='w-full h-full bg-gray-200'></div>
          }
        </div>
        <div className='flex justify-between flex-col'>
          <div>
            <p className='font-bold text-lg'>{itemsSnapshot[0].product.title}</p>
            <p className='text-sm'>{itemsSnapshot[0].quantity} item x <span>{formatCurrency(itemsSnapshot[0].product.price)}</span></p>
          </div>
          <p className='text-sm mt-3'>+{itemsSnapshot.length - 1} more product</p>
        </div>
      </div>
      <div className='order-total flex gap-5 justify-end items-end flex-col'>
        <div className='text-right'>
          <p className='text-sm'>Total Bill</p>
          <p className='font-bold'>{formatCurrency(totalBill)}</p>
        </div>
        <div className='order-btn flex gap-3 justify-end items-end'>
          {(status === 'pending' || status === 'processing') && cancel === 'never' &&
          <button
            onClick={() => requestCancelOrder(_id)}
            className='font-bold py-1 px-3 bg-[var(--primary)] border-2 border-[var(--primary)] text-white rounded-full'>
            Cancel
          </button>}
          <button
            onClick={() => seeOrderDetail(order)}
            className='hidden md:block font-bold py-1 px-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full'>
            See Detail
          </button>
          {status === 'finished' || cancel === 'approved' && <button className='font-bold py-1 px-3 bg-[var(--primary)] border-2 border-[var(--primary)] text-white rounded-full'>
            Buy Again
          </button>}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
