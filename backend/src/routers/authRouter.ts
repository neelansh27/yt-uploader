import { Router } from "express";
const authRouter = Router();
import passport from "passport";

authRouter.get('/google',
  passport.authenticate('google', { 
    scope: [
      'profile', 
      'email',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube'
    ],
    accessType: 'offline',
    prompt: 'consent'
  })
);

authRouter.get("/google/callback",
        passport.authenticate('google', { failureRedirect: process.env.FRONTEND_URL }),
        (req, res)=> {
            res.redirect(process.env.FRONTEND_URL+"/home")
})

authRouter.get('/current_user', (req, res) => {
    console.log("hit")
  res.json(req.user);
});

export default authRouter;
