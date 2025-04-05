import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  book: {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, requires: true },
    price: { type: Number, required: true, min: 0 },
    seller: {
      type: String,
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
    },
  },
  quantity: { type: Number, required: true, min: 1 },
  status: { type: String, default: 'ordered' },
  delivery: {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    contactno: { type: String, required: true },
  },
  payment: {
    hashedcard: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    success: { type: Boolean, default: false  }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Indexes for find, We find the orders based on buyer and sales based on seller.
orderSchema.index({ buyer: 1 });
orderSchema.index({ 'book.seller': 1 });

// Indexes for update, we update the status based on slug, seller and _id.
orderSchema.index({ _id: 1, 'book.seller': 1, 'book.slug': 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;