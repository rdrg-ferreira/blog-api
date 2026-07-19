import db from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";
import { hash } from "bcryptjs";

const validateUser = [
    body("username")
        .trim()
        .isAlphanumeric()
        .withMessage("Username must be alphanumeric")
        .isLength({ min: 3, max: 100 })
        .withMessage("Username must have at least 3 characters")
        .custom(async (value) => {
            const user = await db.getUser({ username: value });
            if (user) throw new Error("Username already exists");
        }),
    body("password")
        .trim()
        .isLength({ min: 6, max: 100 })
        .withMessage("Password must have at least 6 characters"),
    body("confirmPassword")
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage("Passwords do not match."),
];

export const createUser = [
    validateUser,
    async (req, res) => {
        if (req.user) {
            return res.status(403).json({ error: "You need to logout before creating a new user"});
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = matchedData(req);
        const hashedPassword = await hash(password, 10);
        const user = await db.createUser(username, hashedPassword);
        res.status(201).json(user);
    },
];

export async function getUser(req, res) {
    const { id } = req.params;
    const user = await db.getUser({id});
    res.json(user);
}

export async function updateUserRole(req, res) {
    // TODO: review this after jwt
    if (!req.user) {
        return res.status(401).json({ error: "You need to be logged in to access this resource"});
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "You need to have Admin role to access this resource"});
    }

    const { id } = req.params;
    const user = await db.getUser({id});
    if (!user) {
        return res.status(404).json({ error: "The id provided does not belong to a user"});
    }

    const updatedUser = await db.updateUserRole(id);
    res.json(updatedUser);
}