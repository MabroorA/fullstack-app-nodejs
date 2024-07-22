import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).send({ error: "Error creating user" });
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
