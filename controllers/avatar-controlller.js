import path from "path";
import fs from "fs/promises";
import User from "../models/user.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Jimp from "jimp";

const posterPath = path.resolve("public", "avatars");
const updateAvatar = async (req, res) => {
    const { _id} = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(posterPath, filename);
    await fs.rename(oldPath, newPath);
    const avatarUrl = path.join("avatars", filename);
    Jimp.read(newPath, (err, avatar) => {
        if (err) throw err;
        avatar.
            resize(250, 250)
            .write(newPath)
    });

    await User.findByIdAndUpdate(_id, {avatarUrl: avatarUrl});
    res.status(201).json({
        avatarUrl
    });
}

export default {
    updateAvatar: ctrlWrapper(updateAvatar),
}
