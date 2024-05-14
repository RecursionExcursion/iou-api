import express from "express";
import userService from "./userService.js";

const router = express.Router();

//Create
router.post("/", (req, res) => {
  try {
    const { username, email, password } = req.body;
    userService.createNewUser(username, email, password).then((resp) => {
      //TODO make the response more informative and use codes
      resp ? res.send("User Created") : res.send("User Not Created");
    });
  } catch (e) {
    res.send("User Not Created- " + e.message);
  }
});

//Read
/* Get all users */
router.get("/", (req, res) => {
  userService.getAllUsers().then((resp) => {
    res.send(resp);
  });
});

/* Get user by username */
router.get("/:username", (req, res) => {
  const username = req.params.username;

  userService.getUserbyUsername(username).then((resp) => {
    res.send(resp);
  });
});

//Delete
router.delete("/:username", (req, res) => {
  const username = req.params.username;

  console.log({ username });

  userService.deleteUser(username).then((resp) => {
    console.log({ resp });

    resp.deletedCount === 1
      ? res.send("User Deleted")
      : res.send("No User Deleted");
  });
});

export default router;
