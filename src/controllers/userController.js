import express from "express";
import userService from "../services/userService.js";
import {
  buildExpectedRequestBodyFormat,
  newUserSkeleton,
} from "../util/expectedRequestBodySkeletons.js";

const router = express.Router();

//Create
router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).send(buildExpectedRequestBodyFormat(newUserSkeleton));
    return;
  }

  userService.createNewUser(username, email, password).then((resp) => {
    res.status(resp.responseCode).send(resp.message);
  });
});

//Read
/* Get all users */
router.get("/", (req, res) => {
  userService.getAllUsers().then((resp) => {
    res.status(200).send(resp);
  });
});

/* Get user by id */
router.get("/id/:id", (req, res) => {
  const id = req.params.id;

  userService.getUserbyId(id).then((resp) => {
    res.status(200).send(resp);
  });
});

/* Get user by username */
router.get("/:username", (req, res) => {
  const username = req.params.username;

  userService.getUserbyUsername(username).then((resp) => {
    res.status(200).send(resp);
  });
});

//Delete
router.delete("/:username", (req, res) => {
  const username = req.params.username;

  userService.deleteUser(username).then((resp) => {
    resp.deletedCount === 1
      ? res.status(200).send("User Deleted")
      : res.status(404).send("No User Deleted");
  });
});

export default router;
