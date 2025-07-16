import express from "express";
const router = express.Router();
import auth from "../middlewares/authMiddleware.js";
import {
  placeOrder,
  getCustomerOrders,
  acceptOrder,
  updateOrderStatus,
  getPartnerOrders,
} from "../controllers/orderController.js";

router.use(auth);

router.post("/BuyOrder", placeOrder);
router.get("/allProducts", getCustomerOrders);
router.get("/partnerOrders", getPartnerOrders);
router.post("/:id/accept", acceptOrder);
router.patch("/:id/status", updateOrderStatus);

export default router;
