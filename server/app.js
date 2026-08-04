import express from "express";
import passport from "./passport/passport.js";
import { Strategy as LocalStrategy } from 'passport-local';
import path from "node:path";
import { fileURLToPath } from "node:url";
import v1 from "./routes/v1/index.js";
import prisma from "./db/prisma.js";
import cors from "cors";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", v1);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Express app listening at http://localhost:${PORT}/`);
});
