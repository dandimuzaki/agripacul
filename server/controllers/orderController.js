import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const addToOrders = async (req, res) => {
  try {
    const user = req.user.id;
    const newOrder = await Order.create({ ...req.body, user: user });

    const productIds = newOrder.items.map((item) => item.product._id);

    const productMap = {};
    newOrder.items.forEach((item) => {
      productMap[item.product._id] = item.quantity;
    });

    const products = await Product.find({ _id: { $in: productIds } });

    if (!products) {
      res.status(404).json({
      success: false,
      message: 'Product you ordered is not found',
      errors: null
    });
    }

    for (const product of products) {
      const quantityOrdered = productMap[product._id];
      product.stock -= quantityOrdered;
      product.sold += quantityOrdered;
      await product.save();
    }

    res.status(201).json({
      success: true,
      message: 'Order created succesfully',
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      errors: err.message
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;

    // Combine filters
    const filters = {};
    if (req.user.role != 'admin') {filters.user = req.user.id;} else {};
    if (status) {filters.status = status;} else {};

    const orders = await Order.find(filters);

    if (!orders) {
      return res.status(404).json({
      success: false,
      message: 'Order not found',
      errors: null
    });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      errors: err.message
    });
  }
};

export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
      success: false,
      message: 'Order not found',
      errors: null
    });
    }
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      errors: err.message
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      errors: err.message
    });
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
      return res.status(404).json({
      success: false,
      message: 'Order not found',
      errors: null
    });
    }
    const validStatus = ['pending', 'processing', 'shipped', 'delivered'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({
      success: false,
      message: 'Invalid status value',
      errors: null
    });
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
    res.status(500).json({
      success: false,
      message: 'Failed to update order',
      errors: err.message
    });
  }
};
