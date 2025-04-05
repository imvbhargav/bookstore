import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 },
  image: { type: String, requires: true },
  seller: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
}, { timestamps: true });

bookSchema.pre('save', async function (next) {
  if (this.title && !this.slug) {
    let baseSlug = this.title.replace(/\s+/g, "-").toLowerCase();
    let uniqueSlug = baseSlug;
    let exists = await mongoose.model('Book').exists({ slug: uniqueSlug });

    // Generate a unique slug if it already exists
    while (exists) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      uniqueSlug = `${baseSlug}-${randomNum}`;
      exists = await mongoose.model('Book').exists({ slug: uniqueSlug });
    }

    this.slug = uniqueSlug;
  }
  next();
});

// Index for seller, We find books based on seller for admin listing.
bookSchema.index({ seller: 1 });

// Index for slug and stock, We find the books based on stock available
// we use this for validating if the book is in stock for ordering.
bookSchema.index({ slug: 1, stock: 1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;