import { createOrder, getAllOrders, getOrderByAdmin, getOrdersByUser, updateOrder } from '@/services/orderService';
import { OrderContext } from './OrderContext';
import { useAddress } from './AddressContext';
import { useShipping } from './ShippingContext';
import { useCheckout } from './CheckoutContext';
import { usePayment } from './PaymentContext';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const OrderProvider = ({ children }) => {
  const { selectedAddress } = useAddress();
  const { checkedItems, totalPrice, totalBill } = useCheckout();
  const { selectedShipping } = useShipping();
  const { selectedPayment } = usePayment();
  const [orders, setOrders] = useState([]);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setOrder] = useState(null);
  const { loadingAuth, accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [itemsRate, setItemsRate] = useState([]);
  const [rateList, setRateList] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orders = await getOrdersByUser();
        setOrders(orders.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      }
    };

    const loadSingleOrder = async (orderId) => {
      try {
        const order = await getOrderByAdmin(orderId);
        setOrder(order.data);
      } catch (err) {
        console.error('Failed to load the order', err);
      }
    };

    if (!loadingAuth && accessToken) {
      loadOrders();
      if (selectedOrder?._id) {
        loadSingleOrder(selectedOrder?._id);
      }
    }
  }, [selectedOrder?._id, loadingAuth, lastUpdated, accessToken]);

  const createNewOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        address: selectedAddress,
        itemsSnapshot: checkedItems,
        items: checkedItems,
        totalPrice: totalPrice,
        totalBill: totalBill,
        shipping: selectedShipping,
        paymentMethod: selectedPayment
      };
      const result = await createOrder(orderData);
      setLastUpdated(Date.now());
      navigate(`/checkout/success/${result.data._id}`);
    } catch (err) {
      if (err.response) {
        const message = err.response.data.errors || 'Error creating order';
        alert(message);
      } else {
        alert('Network error, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const seeOrderDetail = (orderData) => {
    setSelectedOrder(orderData);
    setOpenOrderModal(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setOrder(null);
    setOpenOrderModal(false);
  };

  const confirmOrder = async (orderId) => {
    try {
      await updateOrder(orderId, { 'status': 'processing' });
      setOrders((prev) =>
        prev.map((o) =>
          o._id == orderId ? { ...o, status: 'processing' } : o
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const requestCancelOrder = async (orderId, reason) => {
    try {
      await updateOrder(orderId, { 'cancel': 'requested', 'cancelReason': reason });
      setOrders((prev) =>
        prev.map((o) =>
          o._id == orderId ? { ...o, cancel: 'requested' } : o
        )
      );
    } catch (err) {
      console.error('Failed to cancel order', err.message);
    }
  };

  const rejectCancelOrder = async (orderId, reason) => {
    try {
      await updateOrder(orderId, { 'cancel': 'rejected', 'rejectCancelReason': reason });
      setOrders((prev) =>
        prev.map((o) =>
          o._id == orderId ? { ...o, cancel: 'rejected' } : o
        )
      );
    } catch (err) {
      console.error('Failed to reject order cancellation', err.message);
    }
  };

  const approveCancelOrder = async (orderId) => {
    try {
      await updateOrder(orderId, { 'cancel': 'approved' });
      setOrders((prev) =>
        prev.map((o) =>
          o._id == orderId ? { ...o, cancel: 'approved' } : o
        )
      );
    } catch (err) {
      console.error('Failed to approve order cancellation', err.message);
    }
  };

  const handleRatingModal = (items) => {
    setOpenRatingModal(true);
    setItemsRate(items);
  };

  const closeRatingModal = () => {
    setOpenRatingModal(false);
    setItemsRate([]);
    setRateList([]);
  };

  return (
    <OrderContext.Provider value={{
      createNewOrder,
      orders,
      seeOrderDetail,
      closeOrderModal,
      selectedOrder,
      openOrderModal,
      setOpenOrderModal,
      confirmOrder,
      order,
      lastUpdated, setLastUpdated,
      openRatingModal, handleRatingModal, closeRatingModal,
      itemsRate, rateList, setRateList,
      requestCancelOrder, rejectCancelOrder, approveCancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};