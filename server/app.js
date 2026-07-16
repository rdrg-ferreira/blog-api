import express from "express";
import session from "express-session";
import passport from "./passport/passport.js";
import { Strategy as LocalStrategy } from 'passport-local';
import path from "node:path";
import indexRouter from "./routes/index.js";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from "./db/prisma.js";

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,  // ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRouter);
// add other routers

app.get("/{*splat}", (req, res) => {
    res.status(404).render("notFound404");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render("error500");
});

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Express app listening at http://localhost:${PORT}/`);
});
