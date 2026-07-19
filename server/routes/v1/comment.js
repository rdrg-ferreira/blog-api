import { Router } from "express";
import { getCommentsFromPost, createComment } from "../../controllers/comment.js";
import passport from "../../passport/passport.js";

const router = Router();

router.get("/:postId", getCommentsFromPost);
router.post("/:postId", passport.authenticate("jwt", { session: false }), createComment);

export default router;