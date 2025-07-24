import dotenv from "dotenv";
dotenv.config();

import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { upload } from "../config/multer";
import { VideoService } from "../services/videoService";

const videoRouter = Router();
const videoService = new VideoService();

// all routes have /video prefix
videoRouter.post("/metadata", isAuthenticated, async (req: Request, res: Response) => {
    const prompt = req.body.prompt;
    return res.json(await videoService.generateMeta(prompt))
})


videoRouter.post("/schedule", isAuthenticated, upload.single("video"), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.json({ error: "Video not found" })
        }

        const { tags, title, description, scheduledTime } = req.body;
        const publishAt = new Date(scheduledTime);
        console.log({ publishAt })
        if (publishAt < new Date()) {
            return res.json({ error: "Invalid Time" });
        }
        return res.json(await videoService.uploadVideo(
            req.user!,
            description,
            title,
            tags,
            req.file.path,
            scheduledTime,
        ))
    } catch (error) {
            return res.json({ error: error })
    }
})

export default videoRouter;
