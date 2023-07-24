import app from "./app.js";

import mongoose from "mongoose";
const DB_HOTST = "mongodb+srv://Mykola:aIQnw0v52JkrkBOW@cluster0.3bgq8wi.mongodb.net/contacts_db?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
 
mongoose.connect(DB_HOTST).then(() => {
  app.listen(3000)
}).catch(error => {
  console.log(error.message);
  process.exit(1);
})
