import CalendarToken from '../models/Calendar.model.js';
//import {google} from 'googleapis';
import getOAuthClient from '../utils/auth.googleCalendar.js'
import dotenv from 'dotenv';

dotenv.config();

const Scopes = ['https://www.googleapis.com/auth/calendar.events'];

// function getOAuthClient()
// {
//     return new google.auth.OAuth2(Client_ID,client_Secret,Redirect_Uri);
// }


// Get URL

export const getAuthUrl = (req,res) => {
    try {
      const oAuth2Client = getOAuthClient();
      const authUrl = oAuth2Client.generateAuthUrl({
          access_type: "offline",
          scope: Scopes,
          prompt: 'consent'

      });
      res.json({url: authUrl});
    } catch (error) {
      console.log("Error generating auth URL : ",error.message);
      res.status(500).json({error: 'Failed to generate Google auth url'});
    }
    
    
};


// Callback

export const googleCallback = async(req,res) => 
  {
    const oAuth2Client = getOAuthClient();
    const code= req.query.code;
    if (!code) 
    {
      return res.status(400).send('Authorizing code missing');
    }

    
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      if (!req.user || !req.user._id) {
      console.error("User not found in request");
      return res.status(401).send("User not authenticated");
    }

      const filter = { user: req.user._id };
      const update = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        scope: tokens.scope,
        token_type: tokens.token_type,
        expiry_date: tokens.expiry_date
    };
    await CalendarToken.findOneAndUpdate(filter,update, {upsert: true, new: true});

    res.status(200).send('Google Calendar connected successfully! ');
    }
    catch(error)
    {
        console.error("error during OAuth callback : ",error.message);
        res.status(500).send("OAuth Failed");
    }
};

// get booked dates

export const getBookedDates = async (req, res) => {
  // const { summary, description, startDateTime, endDateTime } = req.body;
  try {
    const tokens = await CalendarToken.findOne({ user: req.user._id });
    if (!tokens) 
    {
      return res.status(401).json({ error: 'Google Calendar not connected' });
    }
    const oAuth2Client = getOAuthClient();
    oAuth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const now = new Date();
    const monthLater = new Date();
    monthLater.setMonth(now.getMonth()+1);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: monthLater.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const bookedDates = response.data.items.map(event => ({
      date: event.start.dateTime || event.start.date,
      summary: event.summary,
    }));

    res.status(200).json({bookedDates});



    // const event = {
    //   summary,
    //   description,
    //   start: { dateTime: new Date(startDateTime).toISOString() },
    //   end: { dateTime: new Date(endDateTime).toISOString() }
    // };

    // const response = await calendar.events.insert({
    //   calendarId: 'primary',
    //   resource: event
    // });

    
  } catch (error) {
    console.error('Error fetching booked dates : ', error.message);
    res.status(500).json({ error: 'Failed to fetch booked dates' });
  }
};

