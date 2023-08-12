import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_ADDRESS, EMAIL_PASS } = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 2525
    secure: true,
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASS,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = data => {
    const email = { ...data, from: EMAIL_ADDRESS };
    return transport.sendMail(email);
}

export default sendEmail;