import api from '@/api/axios';

export const getOrdersByUser = async () => {
  try {
    const res = await api.get('/orders');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch user orders', err);
    throw err;
  }
};

export const getAllOrders = async () => {
  try {
    const res = await api.get('/admin/orders');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch all orders', err);
    throw err;
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await api.post('/orders', orderData);
    return res.data;
  } catch (err) {
    console.error('Failed to create an order', err);
    throw err;
  }
};

export const updateOrder = async (orderId, orderUpdates) => {
  try {
    const res = await api.put(`/admin/orders/${orderId}`, orderUpdates);
    return res.data;
  } catch (err) {
    console.error('Failed to update order', err);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const res = await api.get(`/orders/${orderId}`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch the order', err);
  }
};

export const getOrderByAdmin = async (orderId) => {
  try {
    const res = await api.get(`/admin/orders/${orderId}`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch the order', err);
  }
};