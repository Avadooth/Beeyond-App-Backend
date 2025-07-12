const User = require('../models/User');
const Order = require('../models/Order');

// GET /admin/users
export const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

// DELETE /admin/users/:id
export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
};

// GET /admin/orders
export const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate('customerId partnerId');
    res.json(orders);
};

// PATCH /admin/orders/:id
export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
};

export default { getAllUsers, deleteUser, getAllOrders, updateOrderStatus };
