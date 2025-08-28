import { useEffect, useState } from 'react';
import { CheckoutContext } from './CheckoutContext.jsx';
import { useCart } from './CartContext.jsx';

export const CheckoutProvider = ({ children }) => {
  const { cart } = useCart();
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const totalPrice = checkedItems.reduce((acc, item) => acc + item.product.price, 0);

  const handleCheckout = (item) => {
    const isAlreadyChecked = checkedItems.some(
      (checked) => checked.product._id === item.product._id
    );

    if (isAlreadyChecked) {
      // Remove only this one
      setCheckedItems((prev) =>
        prev.filter((checked) => checked.product._id !== item.product._id)
      );
    } else {
      // Add it
      setCheckedItems((prev) => [...prev, item]);
    }
  };

  const checkAll = () => {
    if (isAllChecked) {
      setCheckedItems([]); // uncheck all
    } else {
      setCheckedItems(cart); // check all
    }
    setIsAllChecked(!isAllChecked);
  };

  useEffect(() => {
    const compareAllChecked =
      cart.length > 0 &&
      cart.every((cartItem) =>
        checkedItems.some(
          (checked) => checked.product._id === cartItem.product._id
        )
      );

    setIsAllChecked(compareAllChecked);
  }, [cart, checkedItems]);

  

  return (
    <CheckoutContext.Provider
      value={{
        checkedItems,
        handleCheckout,
        checkAll,
        isAllChecked,
        totalPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};