import jwt from 'jsonwebtoken';

function validateLogin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (err) {
    console.error("Some error occured while authenticating: ", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

function validateIsAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Forbidden Access" });
    }
    req.email = decoded.email;
    req.isAdmin = decoded.isAdmin;
    next();
  } catch (err) {
    console.error("Some error occured while authenticating: ", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { validateIsAdmin, validateLogin };