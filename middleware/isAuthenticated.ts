import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuthenticated = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "You need to login first",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_ACCESS_SECRET || "";
    const payload = verify(token, secret);
    req.payload = payload;
  } catch (error: any) {
    res.status(401);
    if (error.name === "TokenExpiredError") {
      return res.json({
        message: "Token expired",
      });
    }
    return res.send("🚫 Un-Authorized 🚫");
  }
  return next();
};
