export class Transaction {
    id = "";
    transactionId = "";
    senderId = "";
    recipientId = "";
    amount = "";
    pending = "";
    timestamp = "";
    resolutionTimestamp = "";
  
    constructor(
      id,
      senderId,
      recipientId,
      amount,
      pending,
      timestamp,
      resolutionTimestamp
    ) {
      this.id = id;
      this.senderId = senderId;
      this.recipientId = recipientId;
      this.amount = amount;
      this.pending = pending;
      this.timestamp = timestamp;
      this.resolutionTimestamp = resolutionTimestamp;
    }
  }