import { useState } from 'react';
import { CheckoutContext } from './CheckoutContext.jsx';
import { useCart } from './CartContext.jsx';

export const CheckoutProvider = ({ children }) => {
  const { cart } = useCart();
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkout, setCheckout] = useState([]);

  const handleCheckout = (id) => {
    const isAlreadyChecked = checkedItems.includes(id);
    if (isAlreadyChecked) {
      setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
      setCheckout((prev) => prev.filter((item) => item.id !== id));
    } else {
      const productToAdd = cart.filter((item) => item.id === id);
      setCheckedItems((prev) => [...prev, id]);
      setCheckout((prev) => [...prev, ...productToAdd]);
    }
  };

  const groupedCheckout = Object.values(
    checkout.reduce((acc, curr) => {
      const key = curr.id;

      if (!acc[key]) {
        acc[key] = { ...curr, amount: 1, total: curr.price };
      } else {
        acc[key].amount += 1;
        acc[key].total += acc[key].price;
      }

      return acc;
    }, {})
  );

  return (
    <CheckoutContext.Provider value={{ checkedItems, checkout, handleCheckout, groupedCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};