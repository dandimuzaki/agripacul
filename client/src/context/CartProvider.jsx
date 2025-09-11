import { useEffect, useState } from 'react';
import { useProduct } from './ProductContext.jsx';
import { CartContext } from './CartContext';
import { addToCartService, fetchCartService, removeCartService, updateCartService } from '@/services/cartService.js';
import { useAuth } from './AuthContext.jsx';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loadingAuth, accessToken } = useAuth();

  // Load cart
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCartService();
        if (cartData) {
          const items = cartData.data.items;
          setCart(items);
        }
      } catch (err) {
        console.error('Error fetching cart', err);
      } finally {
        setLoading(false);
      }
    };
    if (!loadingAuth && accessToken) {
      loadCart();
    }
  }, [loadingAuth]);

  const addToCart = async (productId) => {
    try {
      const updatedCart = await addToCartService(productId);
      if (updatedCart) {
        const items = updatedCart.data.items;
        setCart(items);
      }
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const updatedCart = await updateCartService({ productId, change: -1 });
      if (updatedCart) {
        const items = updatedCart.data.items;
        setCart(items);
      }
    } catch (err) {
      console.error('Error decreasing item quantity', err);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const updatedCart = await updateCartService({ productId, change: 1 });
      if (updatedCart) {
        const items = updatedCart.data.items;
        setCart(items);
      }
    } catch (err) {
      console.error('Error increasing item quantity', err);
    }
  };

  const deleteItem = async (productId) => {
    try {
      const updatedCart = await removeCartService(productId);
      if (updatedCart) {
        const items = updatedCart.data.items;
        setCart(items);
      }
    } catch (err) {
      console.error('Error deleting item', err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, decreaseQuantity, increaseQuantity, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};