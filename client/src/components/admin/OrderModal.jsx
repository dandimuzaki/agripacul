import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useOrder } from '@/context/OrderContext';
import { capitalize, formatCurrency, formatDate } from '@/utils/format';
import CheckoutItem from '../customer/CheckoutItem/CheckoutItem';
import OrderStatus from '../common/OrderStatus';
import { Link } from 'react-router-dom';
import { useCheckout } from '@/context/CheckoutContext';
import Rating from '../customer/Rating';
import RatingModal from '../customer/RatingModal';
import { useAuth } from '@/context/AuthContext';

const OrderModal = () => {
  const { openOrderModal, setOpenOrderModal, order, handleRatingModal, closeOrderModal } = useOrder();
  const { setCheckedItems } = useCheckout();
  const { user } = useAuth();
  const trackingSteps = [
    order?.createdAt && {
      date: order.createdAt,
      text: 'Order placed at',
      description: 'We’ve received your order and it’s now being reviewed.',
      place: 'head',
    },
    order?.cancelRequestedAt && {
      date: order.cancelRequestedAt,
      text: 'Request cancellation at',
      description: 'We’ve received your cancellation request. Awaiting confirmation from our team.',
    },
    order?.confirmedAt && {
      date: order.confirmedAt,
      text: 'Order confirmed at',
      description: 'Your order has been confirmed and is being prepared.',
    },
    order?.cancelApprovedAt && {
      date: order.cancelApprovedAt,
      text: 'Order is cancelled at',
      description: 'Your order has been cancelled successfully. We’re sorry for the inconvenience.',
      place: 'tail',
    },
    order?.cancelRejectedAt && {
      date: order.cancelRejectedAt,
      text: 'Cancellation rejected at',
      description: 'Your cancellation request was reviewed and has been rejected. The order will proceed as usual.',
    },
    order?.shippedAt && {
      date: order.shippedAt,
      text: 'Order shipped at',
      description: `Your order is on its way. Estimated delivery: ${order.shipping?.etd || 'soon'}.`,

    },
    order?.deliveredAt && {
      date: order.deliveredAt,
      text: 'Order delivered at',
      description: 'Your order has been delivered. Thank you for shopping with us!',
      place: 'tail',
    },
  ].filter(Boolean); // Remove nulls

  // Sort by date ascending
  trackingSteps.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Dialog open={openOrderModal} onOpenChange={setOpenOrderModal}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle onClick={() => console.log(user)}>Order Detail</DialogTitle>
        </DialogHeader>
        <div className='grid gap-5 text-sm'>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
            <p className='font-bold text-base'>Order Status</p>
            <p className='flex justify-between'>Order ID<span>{order?._id}</span></p>
            <p className='flex justify-between'>Purchasing Date<span>{formatDate(order?.createdAt)}</span></p>
          </div>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
            <p className='text-base font-bold'>Product Detail</p>
            <div className='grid gap-4'>
              {order?.itemsSnapshot?.map((item, index) => (
                <CheckoutItem key={index} item={item}/>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
            <p className='font-bold text-base col-span-2'>Shipping Information</p>
            <p>Courier</p>
            <p>{order?.shipping.name}</p>
            <p>Address</p>
            <p>{order?.address.detail}, {capitalize(order?.address?.subdistrict?.name)}, {capitalize(order?.address?.district.name)}, {capitalize(order?.address?.city.name)}, {capitalize(order?.address?.province.name)}, {order?.address?.phoneNumber}</p>
          </div>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
            <p className='font-bold text-base'>Payment Detail</p>
            <p className='flex justify-between'>Payment Method<span>{order?.paymentMethod.name}</span></p>
            <p className='flex justify-between'>Total Item Price<span>{formatCurrency(order?.totalPrice)}</span></p>
            <p className='flex justify-between'>Shipping Cost<span>{formatCurrency(order?.shipping.cost)}</span></p>

            <p className='flex justify-between'>Total Bill<span>{formatCurrency(order?.totalBill)}</span></p>

          </div>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
            <p className='font-bold text-base'>Order Tracking</p>
            <div className='grid gap-0'>
              {trackingSteps.map((step, index) => (
                <OrderStatus
                  key={index}
                  date={step.date}
                  text={step.text}
                  description={step.description}
                  place={step.place}
                />
              ))}
            </div>

            {order?.createdAt ? (
              <button
                onClick={() => handleRatingModal(order?.itemsSnapshot)}
                className='justify-self-center w-fit bg-[var(--accent)] px-3 py-2 font-bold rounded cursor-pointer'>Rate Your Order</button>

            ) : ''}
          </div>
        </div>

        {order?.createdAt && user?.role === 'customer' ? (
          <div className='w-full flex justify-center items-center gap-4'>
            <button
              onClick={() => closeOrderModal()}
              className='w-fit bg-yellow-500 px-3 py-1 text-lg font-bold text-white rounded cursor-pointer'>Cancel</button>
            <Link to='/checkout'>
              <button
                onClick={() => setCheckedItems(order?.itemsSnapshot)}
                className='w-fit bg-[var(--primary)] px-3 py-1 text-lg font-bold text-white rounded cursor-pointer'>Buy Again</button>
            </Link>
          </div>
        ): ''}
        <RatingModal/>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;