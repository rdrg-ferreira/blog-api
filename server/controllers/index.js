import { getUser, createUser } from "../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";
import passport from "../passport/passport.js";
import { hash } from "bcryptjs";

export function getIndex(req, res) {
    // if (!req.user) return res.redirect("/log-in");
    res.render("index");
}

export function getSignUpPage(req, res) {
    res.render("signUpForm");
}

const validateUser = [
    body("username")
        .trim()
        .isAlphanumeric()
        .withMessage("Username must be alphanumeric")
        .isLength({ min: 3, max: 100 })
        .withMessage("Username must have at least 3 characters")
        .custom(async (value) => {
            const user = await getUser({ username: value });
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
        if (req.user) return res.redirect("/");

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("signUpForm", { errors: errors.array() });
        }

        const { username, password } = matchedData(req);
        const hashedPassword = await hash(password, 10);
        const user = await createUser(username, hashedPassword);
        res.redirect("/log-in");
    },
];

export function getLogInPage(req, res) {
    const loginMessage = req.session.messages?.[0];
    let loginErrorField = "password";

    if (loginMessage === "Incorrect username") {
        loginErrorField = "username";
    }

    res.render("logInForm", {
        loginMessage,
        loginErrorField,
    });
    req.session.messages = undefined;
}

export function logInUser(req, res, next) {
    return passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureMessage: true,
    })(req, res, next);
}

export function logOutUser(req, res, next) {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
}