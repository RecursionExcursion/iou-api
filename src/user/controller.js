import express from "express";
import db from "../../db/conn.js";
import { createSha256Hash } from "../util.js";
import { User } from "../models/user.js";

const router = express.Router();

//Create
router.post("/create", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = User.createNewUser(
    username,
    email,
    createSha256Hash(password)
  );

  const resp = await db.collection("users").insertOne(newUser.toJson());

  console.log({ resp });

  // const newUser = new User();
  res.send("User Created");
});

//Read
router.get("/", async (req, res) => {
  let users = await db.collection("users").find({}).toArray();

  console.log({ users });

  console.log({
    foo: createSha256Hash("Hello World"),
  });

  res.send("Hello World");
});
export default router;
