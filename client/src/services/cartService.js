import axios from 'axios';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const addToCartService = async (itemId) => {
  const res = await axios.post('http://localhost:3000/api/cart',
    { productId : itemId },
    getAuthHeaders());
  return res.data;
};

export const fetchCartService = async () => {
  const res = await axios.get('http://localhost:3000/api/cart', getAuthHeaders());
  return res.data;
};

export const updateCartService = async ({ productId, change }) => {
  const res = await axios.put(`http://localhost:3000/api/cart/${productId}`,
    { change: change },
    getAuthHeaders());
  return res.data;
};

export const removeCartService = async (itemId) => {
  const res = await axios.delete(`http://localhost:3000/api/cart/${itemId}`, getAuthHeaders());
  return res.data;
};