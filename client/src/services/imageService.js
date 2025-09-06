import api from '@/api/axios';

export const uploadImage = async (formData) => {
  const res = await api.post('/upload', formData);
  return res.data;
};