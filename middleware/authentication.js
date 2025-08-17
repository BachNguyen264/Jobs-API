require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Invalid authorization format");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to the job routes
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid token");
  }
};

module.exports = authMiddleware;
