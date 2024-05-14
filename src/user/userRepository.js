import db from "../../db/conn.js";

const collectionName = "users";

const userRepository = {
  saveNewUser: async (newUser) => {
    try {
      await db.collection(collectionName).insertOne(newUser);
      return true;
    } catch {
      return false;
    }
  },

  getAllUsers: async () => {
    return await db.collection(collectionName).find({}).toArray();
  },

  getUserByUsername: async (username) => {
    return await db.collection(collectionName).findOne({ username });
  },

  deleteUser: async (username) => {
    return await db.collection(collectionName).deleteOne({
      username: username,
    });
  },
};

export default userRepository;
