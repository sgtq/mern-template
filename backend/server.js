import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

import connect from "./configs/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import pinRoutes from "./Route/PinRoutes.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
//app.use(cookieParser());

// Routes
app.use("/api/pins", pinRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const serve = app.listen(PORT, () => {
    connect();
    console.log("Connected".green, "to Server on port:", PORT.yellow.underline);
});
