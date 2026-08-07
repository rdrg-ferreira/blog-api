import { Router } from "express";
import { getCommentsFromPost, createComment, deleteComment } from "../../controllers/comment.js";
import passport from "../../passport/passport.js";

const router = Router();

router.get("/:postId", getCommentsFromPost);
router.post("/:postId", passport.authenticate("jwt", { session: false }), createComment);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteComment);

export default router;