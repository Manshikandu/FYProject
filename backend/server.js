import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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



app.listen(PORT, () => {
    console.log("Server is running on http://localhost " + PORT);
    ConnectMongoDb();
})

    // "test": "echo \"Error: no test specified\" && exit 1"


    // console.log("Server is running")