import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";

// Protect routes (Admin/Doctor/Patient)
export const protect = async (req, res, next) => {
  const { token } = req.cookies || req.headers.authorization;

  if (!token) {
    return next(new ErrorHandler("Not authorized, no token", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    next();
  } catch (error) {
    return next(new ErrorHandler(401, "Not authorized, token failed" ));
  }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            403,
            `Role: ${req.user.role} is not allowed to access this resource`
          )
        );
      }
      next();
    };
  };
  