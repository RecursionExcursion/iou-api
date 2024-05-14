import db from "../../db/conn.js";
import { createServerResponseDto } from "../util/dto.js";
import { getObjectId } from "../util/mongoHelpers.js";

const collectionName = "users";

const userRepository = {
  saveNewUser: async (newUser) => {
    try {
      await db.collection(collectionName).insertOne(newUser);
      return createServerResponseDto(true, "User created", newUser, 200);
    } catch {
      return createServerResponseDto(false, "User not created", {}, 404);
    }
  },

  updateUser: async (id, updatedField) => {
    return await db
      .collection(collectionName)
      .updateOne({ _id: getObjectId(id) }, { $set: updatedField });
  },

  getAllUsers: async () => {
    return await db.collection(collectionName).find({}).toArray();
  },

  getUserByUsername: async (username) => {
    return await db.collection(collectionName).findOne({ username });
  },

  getUserById: async (id) => {
    return await db.collection(collectionName).findOne({ _id: getObjectId(id) });
  },

  deleteUser: async (username) => {
    return await db.collection(collectionName).deleteOne({
      username: username,
    });
  },
};

export default userRepository;
