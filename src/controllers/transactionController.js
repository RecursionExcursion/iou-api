import express from "express";
import transactionService from "../services/transactionService.js";
import {
  buildExpectedRequestBodyFormat,
  newTransactionSkeleton,
  updateTransactionSkeleton,
  getTransactionsByIdsSkeleton,
} from "../util/expectedRequestBodySkeletons.js";

const router = express.Router();

//New Transaction
router.post("/", (req, res) => {
  const { sender, receiver, amount, type } = req.body;

  if (
    !sender ||
    !receiver ||
    !amount ||
    !type ||
    !(type === "iou" || type === "uoi")
  ) {
    res
      .status(400)
      .send(buildExpectedRequestBodyFormat(newTransactionSkeleton));
    return;
  }

  transactionService.createNewTransaction(sender, receiver, amount, type);

  res.status(200).send("Transaction Created");
});

//Get Transaction by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  transactionService.getTransactionById(id).then((resp) => {
    res.status(200).send(resp);
  });
});

//Get Transactions by Ids
router.get("/", (req, res) => {
  const idsArray = req.body.ids;

  if (!idsArray) {
    res
      .status(404)
      .send(buildExpectedRequestBodyFormat(getTransactionsByIdsSkeleton));
    return;
  }

  transactionService.getTransactionsByIds(idsArray).then((resp) => {
    res.status(200).send(resp);
  });
});

/* Update Transaction */
router.put("/", (req, res) => {
  const { transactionId, receiverId, accept } = req.body;

  if (!transactionId || !receiverId || !accept) {
    res
      .status(400)
      .send(buildExpectedRequestBodyFormat(updateTransactionSkeleton));
    return;
  }

  transactionService
    .updateTransactionStatus(transactionId, receiverId, accept)
    .then((resp) => {
      res.status(resp.responseCode).send(resp.message);
    });
});

export default router;
