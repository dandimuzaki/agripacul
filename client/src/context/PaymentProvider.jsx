import { useState } from 'react';
import { PaymentContext } from './PaymentContext';

export const PaymentProvider = ({ children }) => {
  const [paymentOptions, setPaymentOptions] = useState([
    { code: 'bca', name: 'BCA Virtual Account', description: 'Pay via BCA VA' },
    { code: 'bni', name: 'BNI Virtual Account', description: 'Pay via BNI VA' },
    { code: 'mandiri', name: 'Mandiri Virtual Account', description: 'Pay via Mandiri VA' },
    { code: 'ovo', name: 'OVO', description: 'Pay with OVO Wallet' },
    { code: 'dana', name: 'DANA', description: 'Pay with DANA Wallet' },
    { code: 'gopay', name: 'GoPay', description: 'Pay with GoPay Wallet' },
    { code: 'cod', name: 'Cash on Delivery', description: 'Pay when the package arrives' }
  ]);

  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <PaymentContext.Provider value={{
      paymentOptions,
      selectedPayment,
      setSelectedPayment
    }}>
      {children}
    </PaymentContext.Provider>
  );
};