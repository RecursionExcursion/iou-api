import { newTransactionFactory } from "../models/transaction.js";
import transactionRepository from "../repositories/transactionRepository.js";
import userRepository from "../repositories/userRepository.js";
import { createServerResponseDto } from "../util/dto.js";
import userService from "./userService.js";

const transactionService = {
  createNewTransaction: async (sender, receiver, amount, type) => {
    const senderUser = await userRepository.getUserByUsername(sender);
    const receiverUser = await userRepository.getUserByUsername(receiver);

    if (!senderUser || !receiverUser) {
      return createServerResponseDto(false, "User not found", {}, 404);
    }

    //Create new transaction
    const newTransaction = newTransactionFactory(
      senderUser._id.toString(),
      receiverUser._id.toString(),
      amount,
      type
    );

    //Save transaction
    const resp = await transactionRepository.saveTransaction(newTransaction);

    if (!resp.success) {
      return resp;
    }

    const createdTransaction = resp.data;

    //Link transaction to sender and receiver
    senderUser.transactions.push(createdTransaction._id.toString());
    receiverUser.transactions.push(createdTransaction._id.toString());

    //Update sender and receiver
    await userRepository.updateUser(senderUser._id, senderUser);
    await userRepository.updateUser(receiverUser._id, receiverUser);

    return resp;
  },

  getTransactionById: async (id) => {
    return await transactionRepository.getTransactionById(id);
  },

  getTransactionsByIds: async (idsArray) => {
    return await transactionRepository.getTransactionsByIds(idsArray);
  },

  updateTransactionStatus: async (transactionId, receiverId, accept) => {
    const transaction = await transactionRepository.getTransactionById(
      transactionId
    );

    if (transaction.receiverId !== receiverId) {
      return createServerResponseDto(false, "User not authorized", {}, 401);
    }

    if (!transaction) {
      return createServerResponseDto(false, "Transaction not found", {}, 404);
    }

    if (!transaction.pending) {
      return createServerResponseDto(
        false,
        "Transaction already resolved",
        {},
        400
      );
    }

    //TODO need to add a check to see if the transaction is already resolved
    //TODO need to add a check to see if the transaction is already accepted
    //Maybe need a more robust transaction object

    if (accept) {
      const resovledTransaction = resolveTransaction(transaction);

      // transaction.pending = false;
      // transaction.resolutionTimestamp = new Date().toISOString();
      await transactionRepository.updateTransaction(resovledTransaction);

      if (resovledTransaction.type === "iou") {
        await userService.updateUserBalance(
          resovledTransaction.senderId,
          -resovledTransaction.amount
        );
        await userService.updateUserBalance(
          resovledTransaction.receiverId,
          resovledTransaction.amount
        );
      } else if (resovledTransaction.type === "uoi") {
        await userService.updateUserBalance(
          resovledTransaction.senderId,
          resovledTransaction.amount
        );
        await userService.updateUserBalance(
          resovledTransaction.receiverId,
          -resovledTransaction.amount
        );
      }
      return createServerResponseDto(true, "Transaction accepted", {}, 200);
    } else {
      removeTransaction(transaction);
      return createServerResponseDto(true, "Transaction rejected", {}, 200);
    }
  },
};

export default transactionService;

const resolveTransaction = (transaction) => {
  const copy = { ...transaction };
  copy.pending = false;
  copy.resolutionTimestamp = new Date().toISOString();
  return copy;
};

const removeTransaction = (transaction) => {
  transactionRepository.deleteTransaction(transaction.transactionId);

  const sender = userRepository.getUserById(transaction.senderId);
  const receiver = userRepository.getUserById(transaction.receiverId);

  sender.transactions = sender.transactions.filter(
    (id) => id !== transaction.transactionId
  );
  receiver.transactions = receiver.transactions.filter(
    (id) => id !== transaction.transactionId
  );

  userRepository.updateUser(sender._id, sender);
  userRepository.updateUser(receiver._id, receiver);
};
