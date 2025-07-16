import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    productId: { type: String, required: true }, // optional: ref: 'Product'
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "picked-up", "on-the-way", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
