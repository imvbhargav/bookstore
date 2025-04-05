import Book from "../models/book.js";

// Helper function to find the available books.
async function findAvaibleBooks(items) {
  const orConditions = items.map(item => ({
    slug: item.slug,
    stock: { $gte: item.quantity }
  }));

  // Get the books that are in stock.
  const availableBooks = await Book.find({ $or: orConditions }, 'slug stock').lean();
  return availableBooks;
}

async function checkBooksAvailable (req, res, next) {
  const { items } = req.body;

  // Get the books that are in stock.
  const availableBooks = await findAvaibleBooks(items);

  // If no books are available then return conflict.
  if (availableBooks.length !== items.length) {
    return res.status(409).json({
      availableBooks,
      message:  availableBooks.length > 0
                ? "Some ordered books are out of stock"
                : "All ordered books are out of stock!",
    });
  }

  next();
};

export { checkBooksAvailable };