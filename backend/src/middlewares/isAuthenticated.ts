import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    const id = req.user._id;

    if (!id) {
        return res.status(401).json({ error: "Invalid User" });
    }

    const user = User.findById(id);
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }

    next();
}
