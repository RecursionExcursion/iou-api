import { v4 as uuidv4 } from "uuid";

const baseTransaction = {
  transactionId: "",
  senderId: "",
  receiverId: "",
  type: "",
  amount: "",
  pending: "",
  timestamp: "",
  resolutionTimestamp: "",
};

export const newTransactionFactory = (senderId, receiverId, amount, type) => {
  return {
    ...baseTransaction,
    transactionId: uuidv4(),
    senderId,
    receiverId,
    type,
    amount,
    pending: true,
    timestamp: new Date().toISOString(),
  };
};
