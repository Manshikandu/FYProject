import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import ConnectMongoDb from "./db/ConnectMongoDb.js";

import artistRoutes from "./routes/Artist.route.js"

import authRoutes from "./routes/auth.route.js";
import bookingRoutes from "./routes/Artist.Booking.route.js";
import JobPostRoutes from "./routes/Job.Post.route.js";

import calendarRoutes from "./routes/Calendar.route.js";
import AdminRoutes from "./Admin/Admin.route.js" ;
import mediaRoutes from "./routes/media.js";
 import mediaRoutes from "./routes/media.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,                
}));

app.get('/test', (req, res) => {
  res.json({ message: "Test route working" });
});

app.use("/api/artist", artistRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/jobposts", JobPostRoutes);

app.use("/api/google", calendarRoutes );
app.use("/api/media",mediaRoutes)



app.use("/api/auth", AdminRoutes);
app.use("/api/admin", AdminRoutes);

app.listen(PORT, () => {
    console.log("Server is running on http://localhost " + PORT);
    ConnectMongoDb();
})

