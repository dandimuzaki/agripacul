import api from '@/api/axios';

export const createAccount = async (data) => {
  try {
    const res = await api.post(
      '/auth/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return { user: res.data.user, token: res.data.token };
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
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return { user: res.data.user, token: res.data.token };
  } catch (err) {
    return err;
  }
};