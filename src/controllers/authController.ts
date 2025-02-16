import { NextFunction, Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await prisma.user.create({
      data: { username, password },
    });

    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Missing username or password" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || user.password !== password) {
       res.status(401).json({ message: "Invalid credentials" });
        return;
    }

    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
