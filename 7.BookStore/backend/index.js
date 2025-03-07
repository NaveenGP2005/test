// index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js"; // Ensure correct path and extension
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.db)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

app.use(cors());
app.use(express.json());
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
