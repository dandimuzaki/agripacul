import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useOrder } from '@/context/OrderContext';
import CheckoutItem from './CheckoutItem/CheckoutItem';
import Rating from './Rating';
import { updateProduct } from '@/services/productService';
import { useProduct } from '@/context/ProductContext';

const RatingModal = () => {
  const { openRatingModal, closeRatingModal, itemsRate, rateList } = useOrder();
  const { setLastUpdated } = useProduct();

  const submitRating = async () => {
    for (const item of rateList) {
      const updatedProduct = await updateProduct(item._id, { rating: item.rating });
      setLastUpdated(Date.now());
      closeRatingModal();
    }
  };

  return (
    <Dialog open={openRatingModal} onOpenChange={closeRatingModal}>
      <DialogContent className='overflow-y-auto'>
        <DialogHeader>
          <DialogTitle
          >Share Your Rating</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4'>
          {itemsRate?.map((item, index) => (
            <div key={index} className='flex justify-between'>
              <CheckoutItem item={item}/>
              <Rating item={item}/>
            </div>
          ))}
        </div>
        <button
          onClick={submitRating}
          className='px-3 py-2 text-white bg-[var(--primary)] active:bg-[var(--primary-dark)] w-fit rounded justify-self-center'>
          Submit Rating
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
