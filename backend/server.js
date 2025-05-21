import express from "express";
import dotenv from 'dotenv';

import ConnectMongoDb from "./db/ConnectMongoDb.js";
import artistRoutes from "./routes/Artist.route.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use("/api/artist", artistRoutes);

console.log(process.env.MONGO_URI);

app.get("/", (req,res) => {
    res.send("Server is ready");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on http://localhost " + PORT);
    ConnectMongoDb();
})

