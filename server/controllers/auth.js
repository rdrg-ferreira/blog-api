import db from "../db/queries.js";
import passport from "../passport/passport.js";
import jwt from "jsonwebtoken";

export function loginUser(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) return next(err);
        
        if (!user) return res.status(401).json({ error: info.message });

        const token = jwt.sign(
            { user }, 
            process.env.SESSION_SECRET,
            { expiresIn: "1h" },
        );

        return res.status(200).json({
            message: "Login successful",
            token: token, 
            user: { id: user.id, username: user.username, role: user.role }
        });
    })(req, res, next);
}

// assignJWT to add to route