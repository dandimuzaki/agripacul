import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: productId });
    }

    await cart.save();
    await cart.populate('items.product');
    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      data: cart
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Cart fetched successfully',
      data: cart
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { change } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity += change;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() != productId);
    }

    await cart.save();
    await cart.populate('items.product');
    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      data: cart
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    await cart.save();
    await cart.populate('items.product');
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: cart
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};