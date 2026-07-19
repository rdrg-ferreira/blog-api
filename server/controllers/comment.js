import db from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

export async function getCommentsFromPost(req, res) {
    const { postId } = req.params;
    const posts = await db.getCommentsFromPost(postId);
    res.json(posts);
}

const validateComment = [
    body("text")
        .trim()
        .isLength({ min: 3, max: 1000 })
        .withMessage("Text must have between 3 and 1000 characters"),
];

export const createComment = [
    validateComment,
    async (req, res) => {
        if (!req.user) {
            return res.status(401).json({ error: "You need to be logged in to access this resource"});
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { text } = matchedData(req);
        const userId = req.user.id;
        const { postId } = req.params;
        const post = await db.createComment(text, userId, postId);
        res.status(201).json(post);
    },
];