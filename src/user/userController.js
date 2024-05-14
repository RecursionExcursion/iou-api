import express from "express";
import userService from "./userService.js";

const router = express.Router();

//Create
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    userService.createNewUser(username, email, password).then((resp) => {
      console.log({ resp: resp });

      //TODO make the response more informative and use codes
      resp ? res.send("User Created") : res.send("User Not Created");
    });
  } catch (e) {
    res.send("User Not Created- " + e.message);
  }
});

//Read
/* Get all users */
router.get("/", async (req, res) => {
  userService.getAllUsers().then((resp) => {
    res.send(resp);
  });
});

router.get("/:username", async (req, res) => {


  const foo = req.params.username;
  console.log({ foo});
  
  // const { username } = req.body;
  // let user = await db.collection("users").findOne({ username });
  // res.send(user);
});

// //Delete
// router.delete("/", async (req, res) => {
//   const { username } = req.body;

//   const resp = await db.collection("users").deleteOne({
//     username: username,
//   });

//   console.log({ resp });

//   resp.deletedCount === 1
//     ? res.send("User Deleted")
//     : res.send("No User Deleted");
// });

export default router;
