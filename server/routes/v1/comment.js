import { Router } from "express";
import { getCommentsFromPost, createComment } from "../../controllers/comment.js";
const router = Router();

router.get("/:postId", getCommentsFromPost);
router.post("/:postId", createComment);

export default router;