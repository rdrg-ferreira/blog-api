import { Router } from "express";
import { createUser, getUser, updateUserRole } from "../../controllers/user.js";
import passport from "../../passport/passport.js";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), createUser);
router.get("/:id", getUser);
router.put("/:id/role", passport.authenticate("jwt", { session: false }), updateUserRole);

export default router;