import { createOrder, getAllOrders, getOrderByAdmin, getOrdersByUser, updateOrder } from '@/services/orderService';
import { OrderContext } from './OrderContext';
import { useAddress } from './AddressContext';
import { useShipping } from './ShippingContext';
import { useCheckout } from './CheckoutContext';
import { usePayment } from './PaymentContext';
import { useEffect, useState } from 'react';

export const OrderProvider = ({ children }) => {
  const { selectedAddress } = useAddress();
  const { checkedItems, totalPrice, totalBill } = useCheckout();
  const { selectedShipping } = useShipping();
  const { selectedPayment } = usePayment();
  const [orders, setOrders] = useState([]);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [order, setOrder] = useState(null);

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
        console.log(order);
        setOrder(order);
      } catch (err) {
        console.error('Failed to load the order', err);
      }
    };

    loadOrders();
    if (selectedOrder?._id) {
      loadSingleOrder(selectedOrder?._id);
    }
  }, [selectedOrder?._id]);

  const createNewOrder = async () => {
    const orderData = {
      address: selectedAddress,
      items: checkedItems,
      totalPrice: totalPrice,
      totalBill: totalBill,
      shipping: selectedShipping,
      paymentMethod: selectedPayment
    };
    const result = await createOrder(orderData);
    console.log(result.data);
  };

  const seeOrderDetail = (orderData) => {
    setSelectedOrder(orderData);
    setOpenOrderModal(true);
  };

  const closeOrderModal = (orderData) => {
    setSelectedOrder(null);
    setOrder(null);
    setOpenOrderModal(false);
  };

  const confirmOrder = async (orderId) => {
    try {
      const now = new Date();
      await updateOrder(orderId, { 'status': 'processing', 'confirmedAt': now });
      setOrders((prev) =>
        prev.map((o) =>
          o._id == orderId ? { ...o, status: 'processing', confirmedAt: now } : o
        )
      );
    } catch (err) {
      console.error(err);
    }
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
      order
    }}>
      {children}
    </OrderContext.Provider>
  );
};