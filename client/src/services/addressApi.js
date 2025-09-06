import api from '@/api/axios';

export const getAddressList = async () => {
  const res = await api.get('/user/address');
  return res.data;
};

export const addNewAddress = async (formData) => {
  const res = await api.post('/user/address', formData);
  return res.data;
};

export const updateAddress = async ({ addressId, formData }) => {
  const res = await api.put(`/user/address/${addressId}`, formData);
  return res.data;
};

export const removeAddress = async (addressId) => {
  const res = await api.delete(`/user/address/${addressId}`);
  return res.data;
};