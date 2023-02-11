import express from "express";
import {
  getUser, 
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { tokenVerification } from "../middleware/auth.js";

const router = express.Router();

//CRUD
router.get("/:id", tokenVerification, getUser);
router.get("/:id/friends", tokenVerification,getUserFriends);

router.patch("/:id/:friendId", tokenVerification, addRemoveFriend);

export default router;