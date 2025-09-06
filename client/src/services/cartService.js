import api from '@/api/axios';

export const addToCartService = async (itemId) => {
  const res = await api.post('/cart',
    { productId : itemId });
  return res.data;
};

export const fetchCartService = async () => {
  const res = await api.get('/cart');
  return res.data;
};

export const updateCartService = async ({ productId, change }) => {
  const res = await api.put(`/cart/${productId}`,
    { change: change });
  return res.data;
};

export const removeCartService = async (itemId) => {
  const res = await api.delete(`/cart/${itemId}`);
  return res.data;
};