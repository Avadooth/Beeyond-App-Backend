import Order from "../models/Order.js";
import { getIO } from "../sockets/socketHandler.js";

export const placeOrder = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    const { productId, productName, productPrice } = req.body;

    if (!productId || !productName || !productPrice) {
      return res.status(400).json({ message: "Missing product details" });
    }

    const order = new Order({
      customerId: req.user.id,
      productId,
      productName,
      productPrice,
    });

    console.log("User:", req.user);
    console.log("Body:", req.body);

    await order.save();
    console.log("✅ Saved order has ID:", order._id); 
    req.app.get("io").emit("newOrder", order);
    console.log("📢 Emitting newOrder to partners:", order);
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
    console.log("Partner orders fetched:", orders);
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

    // ✅ Use getIO() instead of direct import
    const io = getIO();
    io.to(order._id.toString()).emit("orderStatusUpdate", {
      orderId: order._id,
      status: order.status,
    });

    // io.emit("orderStatusUpdate", {
    //   orderId: order._id,
    //   status: order.status,
    // });
    
    console.log(`Broadcasted status update: ${order._id} => ${order.status}`);
    console.log("Order accepted:", order);

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
