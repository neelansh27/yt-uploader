import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session"
import passport from "passport";
import setupPassport from "./config/passport";
import cors from "cors";
import authRouter from "./routers/authRouter";
import videoRouter from "./routers/videoRouter";

if (!process.env.SESSION_SECRET || !process.env.FRONTEND_URL) {
    throw new Error("Please provide session secreta and frontend url")
}


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
}))
setupPassport(passport);
app.use(cookieParser());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

if (!process.env.MONGO_URL) {
    throw new Error("Please provide mongodb url in environment");
}

mongoose.connect(process.env.MONGO_URL).then(()=> {
    console.log("Connected to DB");
});

app.use("/api/auth", authRouter);
app.use("/video",videoRouter);

app.listen(PORT, () => {
    console.log("App listening on port:" + PORT);
})
