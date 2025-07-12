import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: String }],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'picked-up', 'on-the-way', 'delivered'],
    default: 'pending'
  },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
