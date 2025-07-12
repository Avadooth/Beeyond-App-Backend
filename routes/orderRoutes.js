
import express from 'express';
const router = express.Router();
import auth from '../middlewares/authMiddleware.js';
import {
    placeOrder,
    getOrders,
    acceptOrder,
    updateOrderStatus
} from "../controllers/orderController.js"


router.use(auth);

router.post('/', placeOrder);
router.get('/', getOrders);
router.post('/:id/accept', acceptOrder);
router.patch('/:id/status', updateOrderStatus);

export default router;