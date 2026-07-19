import db from "../db/queries.js";
import passport from "../passport/passport.js";

export function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        
        if (!user) return res.status(401).json({ error: info.message }); 

        req.logIn(user, (err) => {
            if (err) return next(err);
            
            return res.status(200).json({ 
                message: "Login successful", 
                user: user,
            });
        });
    })(req, res, next);
}

// assignJWT to add to route