import express from "express"

import { getFeedPosts, getUserPosts, likePost} from "../controller/posts.js"
import { verifiedToken } from "../middleware/auth.js"

const router = express.Router();

//GET
router.get("/", verifiedToken,getFeedPosts)
router.get("/:userId/posts")

//UPDATE
router.patch("/:id/like", verifiedToken, likePost);

export default router;