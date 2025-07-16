import express from 'express';
import { getAllOrders, getAllPartners } from '../controllers/adminController.js';
import adminAuth from '../middlewares/adminAuth.js';

const router = express.Router();

router.get('/orders', adminAuth, getAllOrders);
router.get('/partners', adminAuth, getAllPartners);

export default router;
