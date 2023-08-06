import express from "express";
import { validateBody, isValidId, authenticate } from "../../middlewars/index.js";
import userSchemas from "../../schemas/user-schemas.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.userSignupSchema), authController.signup);
authRouter.post("/login", validateBody(userSchemas.userSigninSchema), authController.signin)
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout)
export default authRouter;