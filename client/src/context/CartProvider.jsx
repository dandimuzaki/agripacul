import { useEffect, useState } from 'react';
import { useProduct } from './ProductContext.jsx';
import { CartContext } from './CartContext';
import { addToCartService, fetchCartService, removeCartService, updateCartService } from '@/services/cartService.js';

export const CartProvider = ({ children }) => {
  const { products } = useProduct();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true)

  // Load cart
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCartService();
        const items = cartData.data.items
        setCart(items)
      } catch (err) {
        console.error("Error fetching cart", err)
      } finally {
        setLoading(false)
      }
    }
    loadCart()
  }, [])

  const addToCart = async (productId) => {
    try {
      const updatedCart = await addToCartService(productId)
      const items = updatedCart.data.items
      setCart(items)
    } catch (err) {
      console.error("Error adding to cart", err)
    }
  };

  /* Display cart grouped by item */
  const groupedCart = () => {

  };

  const decreaseQuantity = async (productId) => {
    try {
      const updatedCart = await updateCartService({productId, change: -1})
      const items = updatedCart.data.items;
      setCart(items)
    } catch (err) {
      console.error('Error decreasing item quantity', err)
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const updatedCart = await updateCartService({productId, change: 1})
      const items = updatedCart.data.items;
      setCart(items);
    } catch (err) {
      console.error('Error increasing item quantity', err)
    }
  };

  const deleteItem = async (productId) => {
    try {
      const updatedCart = await removeCartService(productId)
      const items = updatedCart.data.items;
      setCart(items);
    } catch (err) {
      console.error('Error deleting item', err)
    }
  }

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, groupedCart, decreaseQuantity, increaseQuantity, clearCart, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};