import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import ConnectMongoDb from "./db/ConnectMongoDb.js";

import artistRoutes from "./routes/Artist.route.js"
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use("/api/artist", artistRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log("Server is running on http://localhost " + PORT);
    ConnectMongoDb();
})

