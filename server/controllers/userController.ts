import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
import jwt,{ Jwt } from "jsonwebtoken";
const prisma = new PrismaClient();

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { name , email, password } = req.body;

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

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User created successfully",
      user: newUser,
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
    // const JWT_SECRET = process.env.JWT_SECRET

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
    
    const token = jwt.sign({ userId: user.id }, "your_jwt_secret");

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

export const getUser = async (req: Request, res: Response) => {};

export const getAllUsers = async (res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    console.log("User :", allUsers);
    return response.json(allUsers);
  } catch (error) {
    res.status(500).send({ error: "Error Getting ALL users" });
  }
};
