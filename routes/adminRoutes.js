const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/adminController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Apply auth + role protection to all admin routes
router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

// @route   GET /api/admin/users
router.get('/users', getAllUsers);

// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', deleteUser);

// @route   GET /api/admin/orders
router.get('/orders', getAllOrders);

// @route   PATCH /api/admin/orders/:id
router.patch('/orders/:id', updateOrderStatus);

module.exports = router;
