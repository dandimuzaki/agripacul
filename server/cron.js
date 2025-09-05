import nodeCron from "node-cron";
import Order from "./models/Order.js";
import { etdToNumber } from "./utils/format.js";

nodeCron.schedule("0 15 * * *", async () => {
  const now = new Date();
  await Order.updateMany(
    { status: 'processing' },
    { $set: { status: 'shipped', shippedAt: now } }
  )
  console.log('Orders shipped at 15:00')
})

nodeCron.schedule("0 0 * * *", async () => {
  const now = new Date();
  const orders = await Order.find({ status: 'shipped' })

  for (const order of orders) {
    const deliveryDate = new Date(order.shippedAt);
    deliveryDate.setDate(deliveryDate.getDate() + etdToNumber(order.shipping.etd))

    if (now >= deliveryDate) {
      order.status = 'delivered';
      order.deliveredAt = now;
      await order.save();
    }
  }
  console.log('Delivered orders updated')
})