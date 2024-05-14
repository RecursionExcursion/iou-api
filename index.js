import "./loadEnviroment.js";
import express from "express";
import userRouter from "./src/controllers/userController.js";
import transactionRouter from './src/controllers/transactionController.js'

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
