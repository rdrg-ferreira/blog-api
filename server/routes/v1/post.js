import { Router } from "express";
import { getAllPosts, createPost, updatePostStatus } from "../../controllers/post.js";
import passport from "../../passport/passport.js";

const router = Router();

function optionalJwtAuth(req, res, next) {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (err) {
			return next(err);
		}

		if (user) {
			req.user = user;
		}

		next();
	})(req, res, next);
}

router.get("/", optionalJwtAuth, getAllPosts);
router.post("/", passport.authenticate("jwt", { session: false }), createPost);
router.put("/:id", passport.authenticate("jwt", { session: false }), updatePostStatus);

export default router;