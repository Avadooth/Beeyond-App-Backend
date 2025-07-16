import Order from "../models/Order.js";
import { getIO } from "../sockets/socketHandler.js";

export const placeOrder = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    const { productId, productName, productPrice ,productImage} = req.body;

    if (!productId || !productName || !productPrice || !productImage) {
      return res.status(400).json({ message: "Missing product details" });
    }

    const order = new Order({
      customerId: req.user.id,
      productId,
      productName,
      productPrice,
      productImage
    });



    await order.save();

    req.app.get("io").emit("newOrder", order);

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order placement error:", err);
    res.status(500).json({
      message: "Failed to place order",
      error: err.message,
    });
  }
};

export const getCustomerOrders = async (req, res) => {
  try {
    // const query =
    //   req.user.role === "customer"
    //     ? { customerId: req.user.id }
    //     : req.user.role === "partner"
    //     ? { partnerId: req.user.id }
    //     : {};
    const orders = await Order.find({ customerId: req.user.id });
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

export const getPartnerOrders = async (req, res) => {
  try {
    if (req.user.role !== "partner") {
      return res.status(403).json({ message: "Access denied" });
    }
    // For partners: show orders assigned to them or still pending
    const orders = await Order.find({
      $or: [{ status: "pending" }, { partnerId: req.user.id }],
    });
    res.json(orders);

  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching delivery orders", error: err.message });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, status: "pending" },
      { status: "accepted", partnerId: req.user.id },
      { new: true }
    );

    if (!order) {
      return res.status(400).json({ message: "Order already accepted" });
    }


    const io = getIO();
    io.to(order._id.toString()).emit("orderStatusUpdate", {
      orderId: order._id,
      status: order.status,
    });


    


    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error accepting order", error: err.message });
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
    res
      .status(500)
      .json({ message: "Error updating status", error: err.message });
  }
};

export default {
  placeOrder,
  getCustomerOrders,
  acceptOrder,
  updateOrderStatus,
  getPartnerOrders,
};
