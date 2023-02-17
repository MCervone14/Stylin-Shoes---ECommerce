import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

interface JwtPayload {
  _id: string;
}

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

const protectRoute = asyncHandler(async (req: Request, res: Response, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET!
      ) as JwtPayload;
      req.user = User.findById(decoded._id);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token error");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token.");
  }
});

export default protectRoute;
