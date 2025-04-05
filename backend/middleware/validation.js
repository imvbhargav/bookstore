import { isDateAfterCurrentMonthYear } from "../utils/date.js";

function validateDetails(req, res, next) {
  const { name, address, contactno, cardno, cvv, expiry } = req.body;

  function containsOnlyChars(str) {
    return  /^[a-zA-Z]+(?: [a-zA-Z]+){0,2} ?$/.test(str);
  }

  // Validate expiry date of the card.
  if (!isDateAfterCurrentMonthYear(expiry)) {
    return res.status(400).json({ message: "Invalid expiry provided" });
  }

  // Simple validation for other details.
  if (!containsOnlyChars(name) && address.length > 4 &&
      contactno.length === 10 && cardno.length === 19 && cvv.length === 3) {
      return res.status(400).json({ message: "Invalid details" });
  }

  next();
}

export { validateDetails };