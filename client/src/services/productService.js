import axios from 'axios';

export const getAllProducts = async () => {
  const res = await axios.get('https://agripacul-production.up.railway.app/api/product');
  return res.data;
};

export const fetchSelectedProduct = async (id) => {
  const res = await axios.get(`http://localhost:3000/api/product/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post('https://agripacul-production.up.railway.app/api/product', data);
  return res.data;
};

export const updateProduct = async (productId, updatedProduct) => {
  const res = await axios.put(`https://agripacul-production.up.railway.app/api/product/${productId}`, updatedProduct);
  return res.data;
};

export const deleteProduct = async (productId) => {
  const res = await axios.delete(`https://agripacul-production.up.railway.app/api/product/${productId}`);
  return res.data;
};