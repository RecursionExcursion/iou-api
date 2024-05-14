const skeletonPrefix = `Missing Required Information 
Expected format-`;

export const buildExpectedRequestBodyFormat = (skeleton) => {
  return `${skeletonPrefix} ${skeleton}`;
};

//User
export const newUserSkeleton = `{
    "username": string,
    "email": string,
    "password": string
}`;

//Transactions
export const newTransactionSkeleton = `{
    "sender": string,
    "receiver": string,
    "amount": number,
    "type": "iou" || "uoi"
}`;

export const updateTransactionSkeleton = `{
    "transactionId": string,
    "receiverId": string,
    "accept": boolean
}`;

export const getTransactionsByIdsSkeleton = `{
    "ids": [string]
}`;
