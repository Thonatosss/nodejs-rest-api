import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const { DB_HOST, PORT } = process.env;
mongoose.set("strictQuery", true);
console.log(DB_HOST);

mongoose.connect(DB_HOST).then(() => {
  console.log(`Database connection successful`);
  app.listen(PORT, () => {
    console.log(`Server is running. On port ${PORT}`);
  })
}).catch(error => {
  console.log(error.message);
  process.exit(1);
})
