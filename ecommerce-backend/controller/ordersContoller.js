import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { orderItems, totalPrice, shippingPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }
  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
      shippingPrice,
      isPaid: false
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      'orderItems.product',
      'name price image'
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};