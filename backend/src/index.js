import { configDotenv } from "dotenv";
configDotenv();

import connectDB from "./db/database.js";

connectDB();
