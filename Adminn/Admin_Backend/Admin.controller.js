import Admin from './Admin.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Artist from "../models/Artist.model.js";
import User from "../models/user.model.js";
import Booking from "../models/Artist.Booking.model.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const Adminlogin = async (req, res) => {
  const { username, password } = req.body;

    // const Adminusername = 'admin';
    // const Adminpassword = 'admin123';
  
try {
    const admin =await Admin.findOne({username});
    if(!admin)
    {
        return res.status(401).json({message: "Invalid username or password"});
    }

    // const isMatch = await bcrypt.compare(password, admin.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid username or password' });
    // }

    const accessToken = jwt.sign(
      { username, role: 'admin' },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
      );

        const refreshToken = jwt.sign(
         { username, role: 'admin' },
         REFRESH_TOKEN_SECRET,
         { expiresIn: '7d' }
        );

    return res.json({ accessToken, refreshToken, username, role: 'admin' });

} catch (error) {
    console.error('Admin login error', error);
    res.status(500).json({message: "Internal server error"});
}
    
    
  
}  
  
export const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
  });
};


export const getAdminDashboardData = async(req,res) => {
  try{
    const artists = await Artist.find();
    const clients = await User.find();

    console.log("artist ", artists.length);
    console.log("Client ", clients.length);
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("client", "username")
      .populate("artist", "username");

    res.status(200).json({
      artistCount: artists.length,
      clientCount: clients.length,
      latestBookings: bookings.map(b => ({
        id: b._id,
        clientName: b.client?.username || "Unknown",
        artistName: b.artist?.username || "Unknown",
        date: b.eventDate?.toISOString().split("T")[0],
        status: b.status
      }))
      // artists,
      // clients 
    });
  }
  catch(error)
  {
    console.error("Dashboard Fetch error : ",error);
    res.status(500).json({message: 'Server Error'});
  }
};


//get artist details 

export const getArtistDetail = async(req,res) => 
{
  try {
    const artist = await Artist.find();
    if(!artist)
    {
      return res.status(404).json({message: "Artist not found"});
    }
    res.json(artist);
  } catch (error) {
    console.error("Error fetching artists: ", error);
    res.status(500).json({message: 'Failed to fetch artist details'});
  }
}

//get Client details 

export const getClientDetail = async(req,res) => 
{
  try {
    const client = await User.find();
    if(!client)
    {
      return res.status(404).json({message: "Client not found"});
    }
    res.json(client);
  } catch (error) {
    console.error("Error fetching clients: ", error);
    res.status(500).json({message: 'Failed to fetch client details'});
  }
}