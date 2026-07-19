import { Router } from "express";
import { createUser, getUser, updateUserRole } from "../../controllers/user.js";
const router = Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id/role", updateUserRole);

export default router;