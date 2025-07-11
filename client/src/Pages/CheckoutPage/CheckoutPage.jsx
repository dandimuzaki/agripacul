import React from 'react';
import PageNav from '../../Components/PageNav/PageNav';
import { ChevronRight, LocationOn } from '@mui/icons-material';
import CheckoutItem from '../../Components/CheckoutItem/CheckoutItem';
import { useCheckout } from '../../context/CheckoutContext';
import formatCurrency from '../../utils/format';

const CheckoutPage = () => {
  const { groupedCheckout, totalPrice } = useCheckout();
  const shippingCost = 14000;
  const totalBill = totalPrice + shippingCost;

  return (
    <div>
      <PageNav path="/cart" text="Checkout" />
      <div className='p-3 md:p-5 flex gap-3 md:gap-5 md:flex-row flex-col'>
        <div className='flex flex-col gap-3 md:flex-2'>
          <div className='shipping-address bg-white flex gap-2 p-3 rounded-lg border border-gray-500'>

            <div className='flex-1 flex flex-col gap-1 text-sm text-black'>
              <p className='text-[var(--teal)]'><LocationOn />Your Shipping Address</p>
              <div className='flex gap-1 items-center'>

                <p className='font-bold'>Rumah &#9679; <span>Dandi Muhamad Zaki</span></p>
              </div>
              <p className='w-72 truncate text-black'>
            Jl. Cidamar Gg. H. Abdullah II No. 51 Jl. Cidamar Gg. H. Abdullah II No. 51 Jl. Cidamar Gg. H. Abdullah II No. 51 Jl. Cidamar Gg. H. Abdullah II No. 51
              </p>
            </div>
            <button className='self-stretch flex justify-center items-center w-8'>
              <ChevronRight />
            </button>
          </div>
          {groupedCheckout.map((product) =>
            <CheckoutItem
              key={product.id}
              product={product}
            />
          )}
          <div className='flex gap-2'><p className='font-bold'>Select Shipping</p></div>
          <div className='shipping-option bg-white flex gap-2 p-3 rounded-lg border border-gray-500'>
            <div className='flex-1 flex flex-col gap-1 text-sm text-black'>
              <p className='font-bold'>Express <span>Rp{shippingCost}</span></p>
              <p className='text-gray-500'>Estimated delivery <span>12 Jul 2025</span></p>
            </div>
            <button className='self-stretch flex justify-center items-center w-8'>
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className='text-black flex flex-col gap-3 md:flex-1'>
          <p className='font-bold'>Payment Method</p>

          <fieldset className='flex flex-col gap-1'>
            <label className='has-checked:bg-[var(--teal)] has-checked:border-none rounded-md p-2 border border-gray-500 flex justify-between text-sm'>Gopay
              <input className='checked:border-[var(--orange)]' name="payment" type='radio' value="Gopay" />
            </label>
            <label className='has-checked:bg-[var(--teal)] has-checked:border-none rounded-md p-2 border border-gray-500 flex justify-between text-sm'>OVO
              <input className='checked:border-[var(--orange)]' name="payment" type='radio' value="OVO" />
            </label>
            <label className='has-checked:bg-[var(--teal)] has-checked:border-none rounded-md p-2 border border-gray-500 flex justify-between text-sm'>BRI
              <input className='checked:border-[var(--orange)]' name="payment" type='radio' value="BRI" />
            </label>
          </fieldset>
          <div className='flex flex-col gap-2 text-black'>
            <h2 className='font-bold text-md'>Check your order summary</h2>
            <div className='flex flex-col gap-1 text-sm'>
              <div className='flex justify-between'>
                <p>Total Price</p>
                <p>
              {formatCurrency(totalPrice)}
                </p>
              </div>
              <div className='flex justify-between'>
                <p>Total Shipping Cost</p>
                <p>{formatCurrency(shippingCost)}</p>
              </div>
              <div className='flex justify-between font-bold'>
                <p>Total Bill</p>
                <p>{formatCurrency(totalBill)}</p>
              </div>
            </div>
          </div>
          <button className='active:bg-[var(--dark-teal)] rounded-lg bg-[var(--teal)] font-bold text-lg text-white p-2 w-full cursor-pointer'>Pay</button>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
