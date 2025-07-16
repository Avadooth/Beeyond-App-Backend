import mongoose from 'mongoose';

const productOrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const ProductOrder = mongoose.model('ProductOrder', productOrderSchema);

export default ProductOrder;
