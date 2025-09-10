import api from '@/api/axios';

export const fetchAllUsers = async () => {
  const res = await api.get('/user');
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await api.delete(`/user/${userId}`)
  return res.data;
}