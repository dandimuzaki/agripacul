import { useEffect, useState } from 'react';
import { CheckoutContext } from './CheckoutContext.jsx';
import { useCart } from './CartContext.jsx';

export const CheckoutProvider = ({ children }) => {
  const { cart } = useCart();
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const totalPrice = checkout.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    setCheckout(cart.filter((item) => checkedItems.includes(item.id)));
  }, [cart, checkedItems]);

  const handleCheckout = (id) => {
    const isAlreadyChecked = checkedItems.includes(id);
    if (isAlreadyChecked) {
      setIsAllChecked(false);
      setCheckedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setCheckedItems((prev) => [...prev, id]);    }
  };

  const testCheckout = () => {
    console.log(checkout);
    console.log(checkedItems);
  };

  const checkAll = () => {
    setIsAllChecked((prev) => !prev);
    if (isAllChecked) {
      setCheckedItems([]);
      setCheckout([]);
    } else {
      setCheckedItems(cart.map((item) => item.id));
      setCheckout(cart);
    }
  };

  useEffect(() => {
    const allId = cart.map((item) => item.id);
    setIsAllChecked(allId.length === checkedItems.length && allId.length > 0);
  }, [cart, checkedItems]);

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
    <CheckoutContext.Provider value={{ testCheckout, checkedItems, checkout, handleCheckout, checkAll, groupedCheckout, isAllChecked, totalPrice }}>
      {children}
    </CheckoutContext.Provider>
  );
};