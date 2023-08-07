import { Schema, model } from "mongoose";
import { emailRegExp } from "../constants/user-constants.js";
import { handleServerError } from "../hooks/hooks.js";
import { validateAtUpdate } from "../hooks/hooks.js";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        match: emailRegExp,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minlengh: 6,

    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarUrl: {
        type: String,
    },
    token: {
        type: String
    },
}, { versionKey: false, timestamps: true });
userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post("save", handleServerError);
userSchema.post("findOneAndUpdate", handleServerError);

const User = model("user", userSchema);
export default User;