import CheckoutItem from '@/components/customer/CheckoutItem/CheckoutItem';
import ProductCardVertical from '@/components/customer/ProductCardVertical/ProductCardVertical';
import { useAuth } from '@/context/AuthContext';
import { useOrder } from '@/context/OrderContext';
import { useProduct } from '@/context/ProductContext';
import { getOrderById } from '@/services/orderService';
import { formatCurrency } from '@/utils/format';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const AfterPurchase = () => {
  const { user, loadingAuth } = useAuth();
  const { orderId } = useParams();
  const [orderCreated, setOrderCreated] = useState(null);
  const { loading } = useOrder();
  const navigate = useNavigate();
  const { products } = useProduct();

  useEffect(() => {
    const loadOrderCreated = async (orderId) => {
      const result = await getOrderById(orderId);
      if (result) {
        setOrderCreated(result);
      }
    };

    if (!loadingAuth) {
      loadOrderCreated(orderId);
    }
  }, [orderId, loadingAuth]);

  return (
    <div className='mt-15 md:px-12 p-6 grid gap-6'>
      <div className='grid gap-4 text-center py-4'>
        <p className='text-2xl font-bold flex gap-2 items-center justify-center'>
          {loading ? <ClipLoader color='#ffffff'/> :
            <CheckCircleOutlineOutlined className='text-[var(--primary)]' fontSize='large'/>
          }
          Order Confirmed!
        </p>
        <p className="text-gray-700">Thank you for ordering with <span className='font-bold text-[var(--primary)]'>Agripacul</span>.<br />We’ve sent a confirmation email to <strong>{user?.email}</strong>.</p>
      </div>

      <div className='grid grid-cols-[2fr_1fr] gap-6'>
        <div className='grid grid-cols-2 gap-2 bg-white rounded-lg p-6'>
          <p className='col-span-2 font-bold text-lg'>Order Summary</p>
          {orderCreated?.itemsSnapshot.map((item, i) =>
            <CheckoutItem
              key={i}
              item={item}
            />
          )}
        </div>
        <div className='grid gap-6 self-start'>
          <div className='grid gap-1 text-sm self-start'>
            <div className='flex justify-between'>
              <p>Total Price</p>
              <p>
                {formatCurrency(orderCreated?.totalPrice)}
              </p>
            </div>
            <div className='flex justify-between'>
              <p>Total Shipping Cost</p>
              <p>{formatCurrency(orderCreated?.shipping.cost)}</p>
            </div>
            <div className='flex justify-between font-bold'>
              <p>Total Bill</p>
              <p>{formatCurrency(orderCreated?.totalBill)}</p>
            </div>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <button
              onClick={() => navigate('/')}
              className='bg-[var(--light-grey)] px-3 py-2 rounded-full font-bold active:bg-[var(--grey)] cursor-pointer'>Back to Home</button>
            <button
              onClick={() => navigate('/orders')}
              className='bg-[var(--primary)] px-3 py-2 rounded-full text-white font-bold active:bg-[var(--primary-dark)] cursor-pointer'>Track My Order</button>

          </div>
        </div>
      </div>
      <div className='gap-3 product-recommendation'>
        <p className='col-span-6 mb-2 font-bold text-2xl'>Recommended for you</p>
        {products.map((product) => <ProductCardVertical key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default AfterPurchase;
