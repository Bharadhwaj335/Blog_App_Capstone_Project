import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  //read token from header or cookie
  let token =
    req.headers.authorization?.split(" ")[1] ||
    req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};
