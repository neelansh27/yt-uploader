// config/passport.js
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User, UserType } from "../models/User";
import { PassportStatic } from "passport";

// https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
type UserFill = {
    _id?: number
}

export default function setupPassport(passport: PassportStatic) {
    if (!process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET) {
        throw new Error("Please provide OAUTH credentials");
    }
    passport.use(new GoogleStrategy({
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // Update tokens for existing user
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    await user.save();
                    return done(null, user);
                } else {
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails![0].value,
                        avatar: profile.photos![0].value,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });

                    await user.save();
                    return done(null, user);
                }
            } catch (error) {
                return done(error, undefined);
            }
        }));


    passport.serializeUser((user: UserFill, done: Function) => {
        console.log(user)
        done(null, user._id);
    });

    passport.deserializeUser((id: string, done: Function) => {
        User.findById(id).then((user: UserType | null) => {
            if (!user) {
                console.log("asd")
                done({ error: "User not found" }, null);
            } else {
                console.log(user)
                done(null, user);
            }
        })
    });
};
