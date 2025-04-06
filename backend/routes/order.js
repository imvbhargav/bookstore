import express from 'express';
import mongoose from 'mongoose';
import { validateIsAdmin, validateLogin } from '../middleware/auth.js';
import { validateDetails } from '../middleware/validation.js';
import { addOrderItem, getSellerSales, getUserOrder, updateBookStock, updateOrderStatus } from '../utils/order.js';
import { checkBooksAvailable } from '../middleware/order.js';

const router = express.Router();

router.post('/checkout', validateLogin, validateDetails, checkBooksAvailable, async (req, res) => {
  const details = req.body;
  details.email = req.email;

  // Start transaction.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    // Create a new order for user..
    await addOrderItem(details, session);

    // Update the book stock.
    await updateBookStock(details.items, session);

    // Commit all the modifications.
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Checkout successfull" });
  } catch (err) {

    // Rollback the transactions on modifaction failure.
    await session.abortTransaction();
    session.endSession();

    console.error("Some error occured while checkout: ", err);
    return res.status(500).json({ message: "Failed to checkout, Internal server error" });
  }
});

router.put('/update', validateIsAdmin, async (req, res) => {
  const item = req.body;
  item.email = req.email;

  try {
    await updateOrderStatus(item);
    return res.status(200).json({ message: "Order status updated successfully!" });
  } catch (err) {
    console.error("Some error occured while order status update: ", err);
    return res.status(500).json({ message: "Failed to update order status, Internal server error" });
  }
});

router.get('/get', validateLogin, async (req, res) => {
  const email = req.email;

  try {
    const orders = await getUserOrder(email);
    return res.status(200).json({ orders, message: "Orders fetched Successfully" });
  } catch(err) {
    console.error("Some error occured while getting orders: ", err);
    return res.status(500).json({ message: "Failed to get orders, Internal server error" });
  }
});

router.get('/get/sales', validateIsAdmin, async (req, res) => {
  const email = req.email;

  try {
    const sales = await getSellerSales(email);
    return res.status(200).json({ sales, message: "Sales fetched successfully" });
  } catch (err) {
    console.error("Some error occured while getting sales: ", err);
    return res.status(500).json({ message: "Failed to get sales, Internal server error" });
  }
});

export default router;