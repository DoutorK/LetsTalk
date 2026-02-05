import User, { IUser } from "../models/User.js";

export class UserService {
  async createUser(username: string, password: string): Promise<IUser> {
    if (!username || !password) {
      throw new Error("Username e password são obrigatórios");
    }
    if (password.length < 6) {
      throw new Error("Password deve ter pelo menos 6 caracteres");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username já está em uso");
    }

    const user = new User({ username, password });
    return await user.save();
  }
}