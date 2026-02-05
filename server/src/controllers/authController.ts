import { Request, Response } from "express";
import { UserService } from "../services/UserService.js";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userService.createUser(username, password);
    res.status(201).json({ message: "Usuário criado com sucesso", userId: user._id });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};