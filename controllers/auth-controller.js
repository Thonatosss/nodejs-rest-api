import { ctrlWrapper } from "../decorators/index.js";
import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import { sendEmail, createVerifyEmail } from "../helpers/index.js"
import bcrypt from "bcryptjs"
import "dotenv/config";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

const { JWT_SECRET, BASE_URL } = process.env;


const signup = async (req, res) => {
    const { email, password, } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email is already taken");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const avatar = gravatar.url(email, { protocol: 'http' })

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl: avatar, verificationToken });

    const verifyEmail = createVerifyEmail({ email, verificationToken });
    await sendEmail(verifyEmail);
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarUrl: avatar,

    })

};

const verify = async (req, res) => {

    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404, "Not found");
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.json({
        message: 'Verification successful'
    })
}
const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw HttpError(400, "Missing required field email");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, "Email not found");
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    };
    const verifyEmail = createVerifyEmail({ email, verificationToken: user.verificationToken });
    await sendEmail(verifyEmail);
    res.json({
        message: "Verification email sent"
    })

}
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const { subscription } = user;
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    if (!user.verify) {
        throw HttpError(401, "Email not verified");
    }


    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token })
    res.json({
        token,
        user: {
            email,
            subscription


        }
    })
}
const getCurrent = async (req, res) => {
    const { name, email, subscription } = req.user;
    res.json({
        name,
        email,
        subscription

    })
}
const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message: "Signout success",
    })
}

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
};