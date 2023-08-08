import mongoose from "mongoose";
import "dotenv/config";
import app from "../../app.js";
import request from "supertest";
import User from "../../models/user.js";




const { PORT, DB_HOST_TEST } = process.env;

describe("test signin route", () => {
    console.log(DB_HOST_TEST);
    let server = null;
    beforeAll(async() => {
        await mongoose.connect(DB_HOST_TEST);
        server = app.listen(PORT);

    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    })

    test("test login with correct data", async () => {
        const loginData = {
            email: "dfsjsfd@gmail.com",
            password: "123456",
        }
        const recivedData = {
            email: "dfsjsfd@gmail.com",
            subscription: 'starter',

        }
        

        const { statusCode, body } = await request(app).post("/api/auth/login").send(loginData);
        expect(statusCode).toBe(200);

        expect(body.user.email).toBe(recivedData.email)
        expect(body.user.subscription).toBe(recivedData.subscription);

        expect(body).toHaveProperty('token');

        expect(body.user).toHaveProperty('email');
        expect(body.user).toHaveProperty('subscription');

        expect(typeof body.user.email).toBe('string');
        expect(typeof body.user.subscription).toBe('string');

        const user = await User.findOne({ email: loginData.email });
        expect(user.email).toBe(recivedData.email);
   


    })
})