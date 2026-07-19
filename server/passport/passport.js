import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from "../db/queries.js";
import { compare } from "bcryptjs";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUser({ username });

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }),
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SESSION_SECRET;

passport.use(
    new JwtStrategy(opts, async function(jwt_payload, done) {
        try {
            const user = await db.getUser({ id: jwt_payload.user.id });

            if (!user) {
                return done(null, false, { message: "Error in creating JWT" });
            }

            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
}));

export default passport;