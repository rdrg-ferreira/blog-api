import db from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

export async function getAllPosts(req, res) {
    const posts = await db.getAllPosts();
    res.json(posts);
}

const validatePost = [
    body("title")
        .trim()
        .isAlphanumeric()
        .withMessage("Title must be alphanumeric")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must have between 3 and 100 characters"),
    body("text")
        .trim()
        .isLength({ min: 3, max: 1000 })
        .withMessage("Text must have between 3 and 1000 characters"),
    body("status")
        .custom((value) => {
            return value in ["PUBLIC", "PRIVATE"];
        })
        .withMessage("That option is invalid"),
];

export const createPost = [
    validatePost,
    async (req, res) => {
        // TODO: review this after jwt
        if (!req.user) {
            return res.status(401).json({ error: "You need to be logged in to access this resource"});
        }

        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ error: "You need to have Admin role to access this resource"});
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, text, status } = matchedData(req);
        const userId = req.user.id;
        const post = await db.createPost(title, text, userId, status);
        res.status(201).json(post);
    },
];