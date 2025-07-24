import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        console.log(req.user)
        const username = req.user?.email.split('@')[0];
        const dir = path.join(import.meta.dirname, '../..', 'uploads/', username || "");

        fs.stat(dir, function(err, stats) {
            if (err) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        })
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const username = req.user?.email.split('@')[0];
        cb(null, `${username}-${Date.now()}${extname}`)
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: 200 * 1024 * 1024 }, // 200Mb
})
