
import Order from '../models/Order.js';

export const placeOrder = async (req, res) => {
    try {
        const order = await Order.create({
            customerId: req.user.id,
            items: req.body.items,
        });
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error placing order', error: err.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const query = req.user.role === 'customer'
            ? { customerId: req.user.id }
            : req.user.role === 'partner'
                ? { partnerId: req.user.id }
                : {};
        const orders = await Order.find(query).populate('customerId partnerId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
};

export const acceptOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, status: 'pending' },
            { status: 'accepted', partnerId: req.user.id },
            { new: true }
        );
        if (!order) return res.status(400).json({ message: 'Order already accepted' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error accepting order', error: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, partnerId: req.user.id },
            { status: req.body.status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error updating status', error: err.message });
    }
};

export default { placeOrder, getOrders, acceptOrder, updateOrderStatus };
