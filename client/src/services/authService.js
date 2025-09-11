import api from '@/api/axios';

export const createAccount = async (data) => {
  try {
    const res = await api.post(
      '/auth/register',
      data,
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const searchEmail = async (email) => {
  try {
    const res = await api.get(`/auth/register/${email}`);
    return res.status;
  } catch (err) {
    return err.response?.status || 500;
  }
};

export const login = async (data) => {
  try {
    const res = await api.post(
      '/auth/login',
      data,
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const logout = async (data) => {
  try {
    const res = await api.post('/auth/logout', data);
  } catch (err) {
    console.error(err);
  }
};

export const silentLogin = async () => {
  try {
    const res = await api.get('/auth/silent-login');
    return res.data;
  } catch (err) {
    console.error('Error get new token', err);
  }
};