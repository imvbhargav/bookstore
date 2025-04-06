import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, getUser } from "../utils/user.js";

const router = express.Router();

// Helper function to create JWT
const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password, isAdmin = false } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(email, hashedPassword, isAdmin);
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const {status, message, user} = await getUser(email);

  // If user fetch failed then return.
  if (status !== 200) {
    console.log(status, message);
    return res.status(status).json({ message });
  }
  // Check password match and if mismatch return.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Create token.
  const token = createToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Login successful", isAdmin: user.isAdmin, email: user.email });
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  res.json({ message: "Logged out!" });
});

// PROTECTED ROUTE
router.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ email: decoded.email, isAdmin: decoded.isAdmin, message: "User is logged in!" });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;