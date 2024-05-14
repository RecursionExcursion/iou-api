import userRepository from "../repositories/userRepository.js";
import { newUserFactory } from "../models/user.js";
import { createSha256Hash } from "../util/util.js";

const userService = {
  createNewUser: async (username, email, password) => {
    const hashedPassword = createSha256Hash(password);
    const newUser = newUserFactory(username, email, hashedPassword);
    return await userRepository.saveNewUser(newUser);
  },

  getAllUsers: async () => {
    return await userRepository.getAllUsers();
  },

  getUserbyUsername: async (username) => {
    return await userRepository.getUserByUsername(username);
  },

  getUserbyId: async (id) => {
    return await userRepository.getUserById(id);
  },

  deleteUser: async (username) => {
    return await userRepository.deleteUser(username);
  },

  updateUserBalance: async (id, amount) => {
    const user = await userService.getUserbyId(id);
    user.balance += amount;
    return await userRepository.updateUser(id, { balance: user.balance });
  },
};

export default userService;
