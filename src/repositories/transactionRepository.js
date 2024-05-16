import db from "../../db/conn.js";
import { createServerResponseDto } from "../util/dto.js";
import { getObjectId } from "../util/mongoHelpers.js";

const collectionName = "transactions";

const transactionRepository = {
  saveTransaction: async (newTransaction) => {
    try {
      await db.collection(collectionName).insertOne(newTransaction);
      return createServerResponseDto(
        true,
        "Transaction created",
        newTransaction,
        200
      );
    } catch {
      return createServerResponseDto(false, "Transaction not created", {}, 404);
    }
  },

  getTransactionById: async (id) => {
    return await db
      .collection(collectionName)
      .findOne({ _id: getObjectId(id) });
  },

  getTransactionsByIds: async (idsArray) => {
    const ids = idsArray.map((id) => getObjectId(id));

    const filter = { _id: { $in: ids } };

    return await db.collection(collectionName).find(filter).toArray();
  },

  updateTransaction: async (transaction) => {
    return await db
      .collection(collectionName)
      .updateOne({ _id: transaction._id }, { $set: transaction });
  },

  deleteTransaction: async (transactionId) => {
    return await db
      .collection(collectionName)
      .deleteOne({ _id: getObjectId(transactionId) });
  },
};

export default transactionRepository;
