const getNextShipmentTime = (orderDate) => {
  const nextShipment = new Date(orderDate);
  nextShipment.setHours(15, 0, 0, 0);

  if (orderDate.getHours() > 15) {
    nextShipment.setDate(nextShipment.getDate() + 1)
  }

  return nextShipment;
}

const estimatedDays = 2;

const confirmOrder = async () => {
  const now = new Date();
  console.log('Now', now)
  const shipmentTime = getNextShipmentTime(now);
  const msToShipment = shipmentTime.getTime() - now.getTime();
  console.log(msToShipment)
  setTimeout(() => {
    console.log('Yeay', msToShipment)
    const msToDelivery = estimatedDays * 24 * 60 * 60 * 1000;
    const shippedAt = new Date()
    console.log('deliveredAt', shippedAt)
    setTimeout(() => {
      console.log('Yeay', msToDelivery)
      const deliveredAt = new Date()
      console.log('deliveredAt', deliveredAt)
    }, 10000)
  }, 20000)
}

confirmOrder()