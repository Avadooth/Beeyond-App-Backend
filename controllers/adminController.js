import Order from '../models/Order.js';
import User from '../models/User.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('partnerId', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

export const getAllPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: 'partner' }).select('-password');
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch partners', error: err.message });
  }
};
