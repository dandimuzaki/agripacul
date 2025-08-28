import axios from 'axios';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getAddressList = async () => {
  const res = await axios.get('http://localhost:3000/api/user/address', getAuthHeaders());
  return res.data;
};

export const addNewAddress = async (formData) => {
  const res = await axios.post('http://localhost:3000/api/user/address', formData, getAuthHeaders());
  return res.data;
};

export const updateAddress = async ({ addressId, formData }) => {
  const res = await axios.put(`http://localhost:3000/api/user/address/${addressId}`, formData, getAuthHeaders());
  return res.data;
};

export const removeAddress = async (addressId) => {
  const res = await axios.delete(`http://localhost:3000/api/user/address/${addressId}`, getAuthHeaders());
  return res.data;
};