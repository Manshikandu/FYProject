import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema({
    user:
    {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 

    },
    access_token:
    {
        type: String,
         required: true
    },
    refresh_token:
    {
        type: String,

    },
    scope: String,

    token_type: String,

    expiry_date: Number

},{timestamps: true});

const CalendarToken =  mongoose.model('CalendarToken', calendarSchema)

export default CalendarToken;