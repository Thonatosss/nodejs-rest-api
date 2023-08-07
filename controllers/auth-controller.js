import { ctrlWrapper } from "../decorators/index.js";
import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcryptjs"
import "dotenv/config";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

const { JWT_SECRET } = process.env;


const signup = async (req, res) => {
    const { email, password, } = req.body;
    const user = await User.findOne({email})
    if (user) { 
        throw HttpError(409, "Email is already taken");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email, { protocol: 'http' })

    const newUser = await User.create({...req.body, password: hashPassword, avatarUrl: avatar});
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarUrl: avatar,
       
    })

};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const { subscription } = user;
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token})
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
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
};