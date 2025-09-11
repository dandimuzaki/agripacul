import api from '@/api/axios';

export const getProducts = async (query = '') => {
  const res = await api.get(`/product?${query}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post('/product', data);
  return res.data;
};

export const updateProduct = async (productId, updatedProduct) => {
  const res = await api.put(`/product/${productId}`, updatedProduct);
  return res.data;
};

export const deleteProduct = async (productId) => {
  const res = await api.delete(`/product/${productId}`);
  return res.data;
};