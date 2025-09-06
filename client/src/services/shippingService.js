import api from '@/api/axios';

export const getShipping = async (shippingData) => {
  const res = await api.post('/shipping', shippingData);
  return res.data;
};