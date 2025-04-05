import multer from "multer";
import dotenv from "dotenv";
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { validateIsAdmin, validateLogin } from "../middleware/auth.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {  addBook, deleteBook, getBookBySlug, getBooks, getManyBooksBySlug, getSellerBooks, updateBook } from "../utils/book.js";

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
      const format = file.mimetype.split("/")[1];
      if (!["jpeg", "png", "jpg", "webp"].includes(format)) {
        throw new Error("Unsupported file format");
      }

      const title = req?.body?.title ?? "untitled";
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      return {
        folder: "bookstore",
        format: format,
        public_id: title.replace(/\s+/g, "-").toLowerCase() + '-' + randomNum,
      };
    }
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

router.post('/add', validateIsAdmin, upload.single("image"), async (req, res) => {
  const book = req.body;
  const email = req.email;

  try {

    // If file upload successful, add URL to book image.
    if (req.file) {
      book.image = req.file.path;
    }

    // Update book is slug is not provided else add new book to DB.
    if (book?.slug && book.slug !== '') {
      await updateBook(book, email);
      return res.status(201).json({ message: "Book updated successfully!" });
    } else {
      await addBook(book, email);
      return res.status(201).json({ message: "Book added successfully!" });
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({error: err.message});
  }
});


router.get('/get', async (req, res) => {
  const { limit = 12, offset = 0 } = req.query;

  try {
    const { books, count } = await getBooks(limit, offset);
    return res.status(200).json({ books, count, message: "Books fetched successfully!" });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.get('/get/:slug', async (req, res) => {
  const slug = req.params.slug;
  try {
    const book = await getBookBySlug(slug);

    // If book not found.
    if (!book) {
      return res.status(404).json({ book, message: "Book not found!" });
    }

    return res.status(200).json({ book, message: "Book fetched successfully!" });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

router.delete('/:slug', async (req, res) => {
  const slug = req.params.slug;
  try {
    await deleteBook(slug);
    return res.status(204).json({ book, message: `Book ${slug} deleted!` });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
})

router.post('/cart', validateLogin, async (req, res) => {
  const { items } = req.body;

  try {
    const books = await getManyBooksBySlug(items);
    return res.status(200).json({ books, message: 'Books fetched deleted!' });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
})

router.get('/seller/get', validateIsAdmin, async (req, res) => {
  const { limit = 12, offset = 0 } = req.query;
  const email = req.email;

  try {
    const { books, count } = await getSellerBooks(email, limit, offset);
    return res.status(200).json({ books, count, message: "Books fetched successfully!" });
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

export default router;