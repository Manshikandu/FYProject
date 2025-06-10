import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    eventDate:{
        type: Date,
        required: true,
    },
    message:{
        type: String,
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    message: String,
    
},
{timestamps: true});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;