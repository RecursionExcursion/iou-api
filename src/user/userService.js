import userRepository from "./userRepository.js";
import { createNewUserFactory } from "../models/user.js";
import { createSha256Hash } from "../util.js";

const userService = {
  createNewUser: async (username, email, password) => {
    const hashedPassword = createSha256Hash(password);
    const newUser = createNewUserFactory(username, email, hashedPassword);
    return await userRepository.saveNewUser(newUser);
  },

  getAllUsers: async () => {
    return await userRepository.getAllUsers();
  },
};

export default userService;
