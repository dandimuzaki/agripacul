import { useEffect, useState } from 'react';
import { CheckoutContext } from './CheckoutContext.jsx';
import { useCart } from './CartContext.jsx';

export const CheckoutProvider = ({ children }) => {
  const { cart } = useCart();
  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  // Derive checkout directly from checkedItems
  const checkout = checkedItems;

  const totalPrice = checkout.reduce((acc, item) => acc + item.product.price, 0);

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
    <CheckoutContext.Provider
      value={{
        checkedItems,
        checkout,
        handleCheckout,
        checkAll,
        groupedCheckout,
        isAllChecked,
        totalPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};