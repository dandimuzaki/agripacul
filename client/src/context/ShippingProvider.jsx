import { useEffect, useState } from 'react';
import { useAddress } from './AddressContext';
import { ShippingContext } from './ShippingContext';
import { getShipping } from '@/services/shippingService';

export const ShippingProvider = ({ children }) => {
  const { selectedAddress } = useAddress();
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);

  useEffect(() => {
    if (!selectedAddress) return;
    const getShippingOptions = async () => {
      try {
        const shippingData = {
          origin: 5263,
          destination: selectedAddress.rajaOngkirId,
          courier: 'jne:sicepat:ide:sap:jnt:ninja:tiki:lion:anteraja:pos:ncs:rex:rpx:sentral:star:wahana:dse',
          weight: 1000,
          price: 'lowest'
        };
        const options = await getShipping(shippingData);
        const shippingOptions = options.data;

        const cheapestByCourier = Object.values(
          shippingOptions.reduce((acc, option) => {
            if (!acc[option.code] || option.cost < acc[option.code].cost) {
              acc[option.code] = option;
            }
            return acc;
          }, {})
        );
        setShippingOptions(cheapestByCourier);
      } catch (err) {
        console.error('Error fetching shipping options', err);
      }
    };
    getShippingOptions();
  }, [selectedAddress]);
  return (
    <ShippingContext.Provider
      value={{
        shippingOptions,
        selectedShipping,
        setSelectedShipping
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};