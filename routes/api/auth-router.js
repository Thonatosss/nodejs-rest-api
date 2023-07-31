import express from "express";
import { validateBody, isValidId } from "../../middlewars/index.js";
import userSchemas from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userSchemas.userSignupSchema), authController.signup);
authRouter.post("/signin", validateBody(userSchemas.userSigninSchema), authController.signin)
export default authRouter;