import app from "./app.js";

import mongoose from "mongoose";
import { DB_HOTST } from "./config.js";

mongoose.set("strictQuery", true);
 
mongoose.connect(DB_HOTST).then(() => {
  app.listen(3000)
}).catch(error => {
  console.log(error.message);
  process.exit(1);
})
