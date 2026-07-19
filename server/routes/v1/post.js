import { Router } from "express";
import { getAllPosts, createPost } from "../../controllers/post.js";
import passport from "../../passport/passport.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

export default router;