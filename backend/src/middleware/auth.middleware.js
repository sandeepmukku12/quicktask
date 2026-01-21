import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
