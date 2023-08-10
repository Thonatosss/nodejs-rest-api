import express from "express"
import { authenticate, upload } from "../../middlewars/index.js";
import avatarControlller from "../../controllers/avatar-controlller.js";


const AvatarRouter = express.Router();
AvatarRouter.use(authenticate);

AvatarRouter.patch('/', upload.single("avatarUrl"), avatarControlller.updateAvatar);

export default AvatarRouter;