import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


const jwtSecret = process.env.JWT_SECRET as string

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Name ,Email and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        success: false,
        message: "Email is already registered",
      });
    }

    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    


    const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });
    
    return res.status(201).json({
      status: 201,
      success: true,
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error creating user",
    });
  }
};

export const loginNewUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    if (user) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Login Successful",
        user,
        token,
      });
    }
  } catch (error: any) {
    console.error("Error logging user in:", error.message);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error logging user in:",
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {

    const userId = (req as any).userId;

    if (!userId) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      user,
    });
  } catch (error: any) {
    console.error("Error fetching current user:", error.message);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Error fetching current user",
    });
  }
};

export const getAllUsers = async (res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    return response.json(allUsers);
  } catch (error) {
    res.status(500).send({ error: "Error Getting ALL users" });
  }
};
