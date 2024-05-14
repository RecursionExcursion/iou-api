import db from "../../db/conn.js";

const userRepository = {
  saveNewUser: async (newUser) => {
    try {
      await db.collection("users").insertOne(newUser);
      return true;
    } catch {
      return false;
    }
  },

  getAllUsers: async () => {
    return await db.collection("users").find({}).toArray();
  },
};

export default userRepository;
