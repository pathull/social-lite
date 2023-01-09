import express from "express"

import { getFeed, getUserPosts, likePost} from "../controllers/posts.js"
import { tokenVerification } from "../middleware/auth.js"

const router = express.Router();

//GET
router.get("/", tokenVerification,getFeed)
router.get("/:userId/posts")

//UPDATE
router.patch("/:id/like", tokenVerification, likePost);

export default router;