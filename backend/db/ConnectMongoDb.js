import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {seedAdmin} from '../Admin/Seed/SeedAdmin.js';

dotenv.config();

const ConnectMongoDb = async () => {
    try
    {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected : ${conn.connection.host}`);
        await seedAdmin();
    }
    catch(error)
    {
        console.error(`Error connection to mongoDB : ${error.message}`);
        process.exit(1);
    }
}

export default ConnectMongoDb;