import { useState } from 'react';
import { useProducts } from './ProductsContext.jsx';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const { products } = useProducts();
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      setCart((prev) => [...prev, product]);
    }
  };

  const groupedCart = Object.values(
    cart.reduce((acc, curr) => {
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

  const decreaseQuantity = (id) => {
    const targetProductIndex = cart.findIndex((item) => item.id === id);
    const updatedCart = [...cart];
    if (targetProductIndex !== 1) {
      updatedCart.splice(targetProductIndex, 1);
    }
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    const targetProduct = products.find((item) => item.id === id);
    if (targetProduct) {
      setCart([...cart, targetProduct]);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, groupedCart, decreaseQuantity, increaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};