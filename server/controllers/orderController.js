import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const addToOrders = async (req, res) => {
  try {
    // 1. Create the order
    const userId = req.user;
    const newOrder = await Order.create({ ...req.body, user: userId });

    // 2. Extract product IDs from order items
    const productIds = newOrder.items.map((item) => item._id);

    // 3. Create a map of product ID to quantity
    const productMap = {};
    newOrder.items.forEach((item) => {
      productMap[item._id] = item.quantity;
    });

    // 4. Fetch products from DB and reduce their stock
    const products = await Product.find({ _id: { $in: productIds } });

    for (const product of products) {
      const quantityOrdered = productMap[product._id.toString()] || 1;
      product.stock -= quantityOrdered;
      await product.save();
    }

    // 5. Return the created order
    res.status(201).json({
      success: true,
      message: 'Order created succesfully',
      data: newOrder
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { user } = req.user;
    const { status } = req.query;

    // Combine filters
    const filters = {};
    if (user) {filters.user = user;} else {};
    if (status) {filters.status = status;} else {};

    const orders = await Order.find(filters);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  const { user } = req.user;
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const confirmedAt = req.body?.confirmedAt;
    const shippedAt = req.body?.shippedAt;
    const deliveredAt = req.body?.deliveredAt;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const validStatus = ['pending', 'processing', 'shipped', 'delivered'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    order.status = status;

    if (confirmedAt) {
      order.confirmedAt = confirmedAt;
    }

    if (shippedAt) {
      order.shippedAt = shippedAt;
    }

    if (deliveredAt) {
      order.deliveredAt = deliveredAt;
    }

    const saved = await order.save();
    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: saved
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
