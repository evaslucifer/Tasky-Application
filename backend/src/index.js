import { configDotenv } from "dotenv";
import { app } from "./app.js";
configDotenv();

import connectDB from "./db/database.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `server is running on http://localhost:${process.env.port || 8000}`,
      );
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed", err);
  });
