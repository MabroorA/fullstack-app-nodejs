import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";




const jwtSecret = process.env.JWT_SECRET as string

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "No token provided",
    });
  }

  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    (req as any).userId = decoded.userId;
    next();
    
  } catch (error) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Invalid token",
    });
  }
};
