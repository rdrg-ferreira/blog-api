import { Router } from "express";
import { getIndex, getSignUpPage, createUser, getLogInPage, logInUser, logOutUser } from "../controllers/index.js";
const router = Router();

router.get("/", getIndex);
router.get("/sign-up", getSignUpPage);
router.post("/sign-up", createUser);
router.get("/log-in", getLogInPage)
router.post("/log-in", logInUser);
router.get("/log-out", logOutUser);

export default router;