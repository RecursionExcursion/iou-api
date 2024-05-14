import "./loadEnviroment.js";
import express from "express";
import userRouter from "./src/user/userController.js";

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
