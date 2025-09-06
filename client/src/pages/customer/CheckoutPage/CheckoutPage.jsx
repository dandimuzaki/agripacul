import React, { useState } from 'react';
import { ChevronRight, LocationOn, LocationPin } from '@mui/icons-material';
import { capitalize, formatCurrency } from '@/utils/format.js';
import PageNav from '../../../components/customer/PageNav/PageNav';
import CheckoutItem from '../../../components/customer/CheckoutItem/CheckoutItem';
import { useCart } from '@/context/CartContext';
import AddressForm from '@/components/customer/AddressForm';
import AddressList from '@/components/customer/AddressList';
import { useAddress } from '@/context/AddressContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useShipping } from '@/context/ShippingContext';
import ShippingDropdown from '@/components/customer/ShippingDropdown';
import PaymentMethod from '@/components/customer/PaymentMethod';
import { usePayment } from '@/context/PaymentContext';
import { useOrder } from '@/context/OrderContext';
import { useCheckout } from '@/context/CheckoutContext';

const CheckoutPage = () => {
  const { checkedItems, totalPrice, totalBill } = useCheckout();
  const {
    addressList,
    selectedAddress,
    setOpenAddressList,
  } = useAddress();
  const { selectedShipping } = useShipping();
  const { selectedPayment } = usePayment();
  const { createNewOrder } = useOrder();


  const handleDebug = () => {
    if (selectedAddress) {
      console.log(selectedAddress);
      console.log(selectedShipping);
      console.log(selectedPayment);
      console.log(checkedItems);
    }
  };

  return (
    <div className='p-5 pt-15'>
      <PageNav path="/cart" text="Checkout" />
      <div className='grid md:grid-cols-[1fr_350px] items-start gap-3 md:gap-5'>
        <div className='grid gap-4'>
          <div className='bg-white flex p-5 gap-5 rounded-lg'>
            <div className='flex-1 grid gap-2'>
              <p
                onClick={() => console.log(capitalize(selectedAddress?.subdistrict.name))}
                className='uppercase font-bold text-gray-500'>Delivery Address</p>
              {selectedAddress ?
                <>
                  <p className='font-bold ml-[-4px] flex items-center'><LocationPin className='text-[var(--primary)]'/>{selectedAddress?.label} • {selectedAddress?.recipientName}</p>
                  <p className='text-sm'>{selectedAddress?.detail}, { capitalize(selectedAddress?.subdistrict.name)}, {capitalize(selectedAddress?.district.name)}, {capitalize(selectedAddress?.city.name)}, {capitalize(selectedAddress.province.name)}, {selectedAddress?.phoneNumber}</p>
                </>
                :
                <p>Please set your address</p>
              }
            </div>
            <div className='flex justify-center items-center'>
              <button
                type='button'
                onClick={() => setOpenAddressList(true)}
                className='text-sm font-bold rounded py-1 px-2 bg-[var(--primary)] text-white active:bg-[var(--primary-dark)] cursor-pointer'>
                {(addressList.length != 0) ? 'Change' : 'Add'}
              </button>
            </div>
          </div>
          <div className='grid gap-3 bg-white rounded-lg p-5'>
            {checkedItems.map((item, i) =>
              <CheckoutItem
                key={i}
                item={item}
              />
            )}
          </div>
          <div className='bg-white grid gap-2 p-5 rounded-lg'>
            <p className='uppercase font-bold text-gray-500'>Shipping Option</p>
            <ShippingDropdown/>
          </div>

        </div>
        <div className='grid gap-5 bg-white p-5 rounded-lg'>
          <div className='grid gap-2'>
            <p className='uppercase font-bold text-gray-500'>Payment Method</p>

            <PaymentMethod/>
          </div>
          <div className='flex flex-col gap-2 text-black'>
            <p className='uppercase font-bold text-gray-500'>Shopping Summary</p>
            <div className='flex flex-col gap-1 text-sm'>
              <div className='flex justify-between'>
                <p>Total Price</p>
                <p>
                  {formatCurrency(totalPrice)}
                </p>
              </div>
              <div className='flex justify-between'>
                <p>Total Shipping Cost</p>
                <p>{formatCurrency(selectedShipping?.cost)}</p>
              </div>
              <div className='flex justify-between font-bold'>
                <p>Total Bill</p>
                <p>{formatCurrency(totalBill)}</p>
              </div>
            </div>
          </div>
          <button
            onClick={createNewOrder}
            type='click' className='active:bg-[var(--dark-primary)] rounded-lg bg-[var(--primary)] font-bold text-lg text-white p-2 w-full cursor-pointer'>Pay Now</button>

        </div>
        <AddressForm/>
        <AddressList/>
        <div className='w-8 h-8 bg-green-500' onClick={handleDebug}></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
