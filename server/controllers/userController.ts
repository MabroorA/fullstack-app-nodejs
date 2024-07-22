import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Email and password are required",
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
      data: { email, password },
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
