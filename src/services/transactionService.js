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

    if (!transaction) {
      return createServerResponseDto(false, "Transaction not found", {}, 404);
    }

    if (transaction.receiverId !== receiverId) {
      return createServerResponseDto(false, "User not authorized", {}, 401);
    }

    //TODO need to add a check to see if the transaction is already resolved
    //TODO need to add a check to see if the transaction is already accepted
    //Maybe need a more robust transaction object

    if (accept) {
      transaction.pending = false;
      await transactionRepository.updateTransaction(transaction);

      if (transaction.type === "iou") {
        await userService.updateUserBalance(
          transaction.senderId,
          -transaction.amount
        );
        await userService.updateUserBalance(
          transaction.receiverId,
          transaction.amount
        );
      } else if (transaction.type === "uoi") {
        await userService.updateUserBalance(
          transaction.senderId,
          transaction.amount
        );
        await userService.updateUserBalance(
          transaction.receiverId,
          -transaction.amount
        );
      }
      return createServerResponseDto(true, "Transaction accepted", {}, 200);
    } else {
      transactionRepository.deleteTransaction(transactionId);
      return createServerResponseDto(true, "Transaction rejected", {}, 200);
    }
  },
};

export default transactionService;
