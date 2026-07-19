import { Router } from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import postRouter from "./post.js";
import commentRouter from "./comment.js";
const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);

export default router;