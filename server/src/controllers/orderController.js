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
    /*if (req.user.role != 'admin') {filters.user = req.user.id;};*/
    if (status) {filters.status = status;};

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
      data: order
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
    const {
      status,
      cancel
    } = req.body;

    // 1️⃣ Fetch order and validate existence
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        errors: null
      });
    }

    // 2️⃣ Validate status field
    const validStatus = [
      'pending',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'finished'
    ];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
        errors: null
      });
    }

    const validCancel = [
      'requested',
      'never',
      'approved',
      'rejected',
    ];
    if (cancel && !validCancel.includes(cancel)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cancel value',
        errors: null
      });
    }

    // 3️⃣ Apply updates safely
    if (status) order.status = status;
    if (cancel) order.cancel = cancel;

    if (status === 'processing') {
      order.confirmedAt = new Date();
    }

    if (status === 'shipped') {
      order.shippedAt = new Date();
    }

    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    if (status === 'finished') {
      order.finishedAt = new Date();
    }

    // 4️⃣ Handle cancellation logic cleanly
    if (cancel === 'requested') {
      // If already shipped or delivered, auto reject
      if (order.shippedAt || order.deliveredAt) {
        order.cancel = 'rejected';
        order.cancelRejectedAt = new Date();
      } else {
        order.cancelRequestedAt = new Date();
      }
    }

    // 5️⃣ Handle confirmed cancellation
    if (cancel === 'approved') {
      // Restock products
      const productMap = {};
      order.items.forEach((item) => {
        productMap[item.product._id] = item.quantity;
      });

      const productIds = Object.keys(productMap);
      const products = await Product.find({ _id: { $in: productIds } });

      for (const product of products) {
        const qty = productMap[product._id];
        product.stock += qty;
        product.sold -= qty;
        await product.save();
      }

      order.status = 'cancelled';
      order.cancelApprovedAt = new Date();
    }

    // 6️⃣ Handle cancel rejection
    if (cancel === 'rejected') {
      order.cancelRejectedAt = new Date();
    }

    // 8️⃣ Save changes
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

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        errors: null
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: deletedOrder
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      errors: err.message
    });
  }
};