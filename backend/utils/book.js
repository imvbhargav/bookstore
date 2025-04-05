import Book from "../models/book.js";

async function addBook(book, email) {
  const { title, author, genre, price, description, stock, image } = book;
  const newBook = new Book({ title, author, genre, price, description, stock, image, seller: email });
  const addedBook = await newBook.save();
  return addedBook;
};

async function updateBook(book, email) {
  const { slug, ...rest } = book;
  const updatedBook = await Book.updateOne({ slug, seller: email }, { ...rest });
  return updatedBook;
};

async function deleteBook(slug) {
  const deleted = await Book.deleteOne({ slug });
  return deleted;
}

async function getBooks(limit = 12, offset = 0) {
  const books = await Book.find({})
                          .sort({ createdAt: -1 })
                          .limit(limit)
                          .skip(offset)
                          .exec();
  const count = await Book.countDocuments();
  return {books, count};
}

async function getSellerBooks(email, limit = 12, offset = 0) {
  const books = await Book.find({ seller: email })
                          .sort({ createdAt: -1 })
                          .limit(limit)
                          .skip(offset)
                          .exec();
  const count = await Book.countDocuments({ seller: email });
  return {books, count};
}

async function getBookBySlug(slug) {
  const book = await Book.findOne({ slug });
  return book;
}

export { addBook, updateBook, deleteBook, getBooks, getSellerBooks, getBookBySlug };