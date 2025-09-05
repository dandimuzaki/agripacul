import { createOrder, getAllOrders, getOrdersByUser, updateOrder } from "@/services/orderService"
import { OrderContext } from "./OrderContext"
import { useAddress } from "./AddressContext"
import { useShipping } from "./ShippingContext"
import { useCheckout } from "./CheckoutContext"
import { usePayment } from "./PaymentContext"
import { useEffect, useState } from "react"

export const OrderProvider = ({children}) => {
  const { selectedAddress } = useAddress()
  const { checkedItems, totalPrice, totalBill } = useCheckout()
  const { selectedShipping } = useShipping()
  const { selectedPayment } = usePayment()
  const [orders, setOrders] = useState([])
  const [openOrderModal, setOpenOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orders = await getOrdersByUser();
        setOrders(orders.data)
      } catch (err) {
        console.error('Error fetching orders', err)
      }
    }

    loadOrders()
  }, [])

  const createNewOrder = async () => {
    const orderData = {
      address: selectedAddress,
      items: checkedItems,
      totalPrice: totalPrice,
      totalBill: totalBill,
      shipping: selectedShipping,
      paymentMethod: selectedPayment
    }
    const result = await createOrder(orderData)
    console.log(result.data)
  }

  const seeOrderDetail = (order) => {
    setSelectedOrder(order)
    setOpenOrderModal(true)
  }

  const closeOrderModal = (order) => {
    setSelectedOrder(null)
    setOpenOrderModal(false)
  }

  const getNextShipmentTime = (orderDate) => {
    const nextShipment = new Date(orderDate);
    nextShipment.setHours(15, 0, 0, 0);

    if (orderDate.getHours() > 15) {
      nextShipment.setDate(nextShipment.getDate() + 1)
    }

    return nextShipment;
  }

  const confirmOrder = async (orderId) => {
    try {
    const now = new Date();
    await updateOrder(orderId, {'status': 'processing', 'confirmedAt': now});
    setOrders((prev) => 
      prev.map((o) => 
        o._id == orderId ? { ...o, status: 'processing', confirmedAt: now } : o
      )
    )
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <OrderContext.Provider value={{
      createNewOrder,
      orders,
      seeOrderDetail,
      closeOrderModal,
      selectedOrder,
      openOrderModal,
      setOpenOrderModal,
      confirmOrder
    }}>
      {children}
    </OrderContext.Provider>
  )
}