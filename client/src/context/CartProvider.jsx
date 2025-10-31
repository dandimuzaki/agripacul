import { useCallback, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { addToCartService, fetchCartService, removeCartService, updateCartService } from '@/services/cartService.js';
import { useAuth } from './AuthContext.jsx';
import { useProduct } from './ProductContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loadingAuth, accessToken } = useAuth();
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const { setIsAllChecked } = useProduct();

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await fetchCartService();
      const items = cartData?.data?.items;
      setCart(items);
    } catch (err) {
      console.error('Error fetching cart', err);
      setCart([]);
    } finally {
      setTimeout(() => setLoading(false), 5000);
    }
  };
  // Load cart
  useEffect(() => {
    if (!loadingAuth && accessToken) {
      loadCart();
    }
  }, [loadingAuth, accessToken]);

  const addToCart = async (productId) => {
    try {
      const updatedCart = await addToCartService(productId);
      if (updatedCart) {
        const items = updatedCart.data.items;
        setCart(items);
      }
      setIsAllChecked(false);
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  const decreaseQuantity = useCallback(async (productId) => {
    try {
      const updatedCart = await updateCartService({ productId, change: -1 });
      if (updatedCart) {
        const items = updatedCart.data.items;
        setCart(items);
      }
    } catch (err) {
      console.error('Error decreasing item quantity', err);
    }
  }, []);

  const increaseQuantity = useCallback(async (productId) => {
    try {
      const updatedCart = await updateCartService({ productId, change: 1 });
      if (updatedCart) {
        const items = updatedCart.data.items;
        setCart(items);
      }
    } catch (err) {
      console.error('Error increasing item quantity', err);
    }
  }, []);

  const deleteItem = useCallback(async (productId) => {
    try {
      const updatedCart = await removeCartService(productId);
      if (updatedCart) {
        setCart(updatedCart?.data?.items);
      }
    } catch (err) {
      console.error('Error deleting item', err);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, decreaseQuantity, increaseQuantity, deleteItem, loading }}>
      {children}
    </CartContext.Provider>
  );
};