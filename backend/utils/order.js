import Book from "../models/book.js";
import Order from "../models/order.js";
import bcrypt from "bcryptjs";

// Update the stock information of the books ordered.
async function updateBookStock(items, session) {
  const operations = items.map(item => ({
    updateOne: {
      filter: { slug: item.slug },
      update: { $inc: { stock: -item.quantity } }
    }
  }));

  await Book.bulkWrite(operations, { session });
}

async function addOrderItem(details, session) {
  const { email, name, address, contactno, cardno, cvv, expiry, items, total } = details;

  // Hash the card details.
  const combinedCardInfo = `${cardno}${cvv}${expiry}`;
  const hashedcard = await bcrypt.hash(combinedCardInfo, 10);

  // Create delivery and payment objects.
  const delivery = { name, address, contactno };
  const payment = { hashedcard, amount: total, success: true };

  const operations = items.map(item => {
    const { quantity, ...book } = item;
    return { insertOne: {
      document: {
        buyer: email,
        book,
        quantity: quantity,
        status: 'ordered',
        delivery,
        payment,
      }
    }}
  });
  await Order.bulkWrite(operations, { session });
}

async function getUserOrder(email) {
  const orders = await Order.find({ buyer: email }).sort({ createdAt: -1 });
  return orders;
}

async function getSellerSales(email) {
  const sales = await Order.find({ 'book.seller': email }).sort({ createdAt: -1 });
  return sales;
}

async function updateOrderStatus(item) {
  const { email, saleId, slug, status } = item;

  await Order.updateOne({
    'book.seller': email,
    _id: saleId,
    'book.slug': slug
    },{ status }
  );
}

export { addOrderItem, updateBookStock, getUserOrder, getSellerSales, updateOrderStatus };