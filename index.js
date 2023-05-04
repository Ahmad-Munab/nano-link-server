import dotenv from "dotenv";
dotenv.config();

import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";


import { exit } from "process";
import { redirectURL}  from "./controllers/URL.js";
import protect from "./middlewares/authUser.js";

import userRouter from "./routes/userRouter.js";
import urlRouter from "./routes/urlRouter.js";


const PORT = process.env.PORT || 3500;
const DATABASE_URL = process.env.DATABASE_URL;
const app = express();

// Defining middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));

// Routing
app.get("/:shortURL", redirectURL);

app.use("/api/user", userRouter)
app.use("/api/url", protect, urlRouter);


mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    mongoose.connect(DATABASE_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(
        `Server running on port:${PORT}, `
      );
    });
  } catch (err) {
    console.log(err);
    exit(1);
  }
};

connectDB();
