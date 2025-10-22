import api from '@/api/axios';

export const getProducts = async (query = '') => {
  const res = await api.get(`/products?${query}`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post('/products', data);
  return res.data;
};

export const updateProduct = async (productId, updatedProduct) => {
  const res = await api.put(`/products/${productId}`, updatedProduct);
  return res.data;
};

export const deleteProduct = async (productId) => {
  const res = await api.delete(`/products/${productId}`);
  return res.data;
};