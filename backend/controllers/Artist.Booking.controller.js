import Booking from "../models/Artist.Booking.model.js";

// Create booking request
export const bookingArtist =  async(req, res) =>
{
    try
    {
        const {user, artist, eventDate, message} = req.body;
        const booking = new Booking({user, artist,eventDate, message});
        await booking.save();

        res.status(201).json({message: "Booking request sent", booking});

    }catch(error)
    {
        res.status(500).json({error:"Failed to send booking request.", details: error.message});
    }
}

// get booking request for an artist

export const getBookingRequest = async(req, res) =>
{
    try{
        const artistId = req.params.artistId;
        const bookings = await Booking.find({'artist.id':artistId}).sort({created:-1});
        res.status(200).json({message: "booking fetched", bookings})
    }
    catch(error)
    {
        res.status(500).json({error: 'Failed to fetch bookings' , details: error.message});
    }
}

// Accept or reject bookings

export const BookingStatus = async(req,res) => 
{
    try {
        const {status} = req.body;
        const {bookingId} = req.params;

        if(!['accepted','rejected'].includes(status))
        {
            return res.status(400).json({error: 'Invalid status'});
        }

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            {status},
            {new: true}
        );

        if(!booking)
        {
            res.status(404).json({error: 'Booking not found'});

        }
        res.status(200).json({message:`Booking ${status}`, booking});
    } catch (error) {
        res.status(500).json({error: 'Failed to update booking status', details: error.message});
    }
};
