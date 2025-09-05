import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useOrder } from '@/context/OrderContext';
import { capitalize, formatCurrency, formatDate } from '@/utils/format';
import CheckoutItem from '../customer/CheckoutItem/CheckoutItem';

const OrderModal = () => {
  const { openOrderModal, setOpenOrderModal, selectedOrder } = useOrder()

  const handleClick = () => {
    console.log(selectedOrder)
  }

  return (
    <Dialog open={openOrderModal} onOpenChange={setOpenOrderModal}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle onClick={handleClick}>Order Detail</DialogTitle>
        </DialogHeader>
        <div className='grid gap-5 text-sm'>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
            <p className='font-bold text-base'>Order Status</p>
            <p className='flex justify-between'>Order ID<span>{selectedOrder?._id}</span></p>
            <p className='flex justify-between'>Purchasing Date<span>{formatDate(selectedOrder?.createdAt)}</span></p>
          </div>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
            <p className='text-base font-bold'>Product Detail</p>
            <div className='grid gap-4'>
            {selectedOrder?.items?.map((item) => (
              <CheckoutItem key={item.product._id} item={item}/>
            ))}
            </div>
          </div>
          <div className='grid grid-cols-[1fr_3fr] p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
          <p className='font-bold text-base col-span-2'>Shipping Information</p>
          <p>Courier</p>
          <p>{selectedOrder?.shipping.name}</p>
          <p>Address</p>
          <p>{selectedOrder && selectedOrder?.address.detail}, {selectedOrder && capitalize(selectedOrder?.address.subdistrict.name)}, {selectedOrder && capitalize(selectedOrder?.address.district.name)}, {selectedOrder && capitalize(selectedOrder?.address.city.name)}, {selectedOrder && capitalize(selectedOrder?.address.province.name)}, {selectedOrder?.address.phoneNumber}</p>
          </div>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
          <p className='font-bold text-base'>Payment Detail</p>
          <p className='flex justify-between'>Payment Method<span>{selectedOrder?.paymentMethod.name}</span></p>
          <p className='flex justify-between'>Total Item Price<span>{selectedOrder && formatCurrency(selectedOrder?.totalPrice)}</span></p>
          <p className='flex justify-between'>Shipping Cost<span>{selectedOrder && formatCurrency(selectedOrder?.shipping.cost)}</span></p>

          <p className='flex justify-between'>Total Bill<span>{selectedOrder && formatCurrency(selectedOrder?.totalBill)}</span></p>

          </div>
          <div className='grid p-4 gap-2 rounded-lg shadow-[0_0_4px_rgba(0,0,0,0.2)]'>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
