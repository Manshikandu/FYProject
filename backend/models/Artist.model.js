import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const artistSchema = new mongoose.Schema({
   username: {
        type: String,
        required: [true,"Name is required"]
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlength: [6,"Password should be at least 6 characters"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
     role:{
        type: String,
        // enum: ["client","artist","admin"],
        default: "artist"
    },
  
    category: {
    type: String,
    enum: ["dj", "musician", "mc", "dancer","singer","other"],
    required: true,
    lowercase: true  
    },

    location:
    {
        type: String,
        required: true
    },
    // location:{
    //     type: String,
    //     required: function () {
    //         return this.role === "artist";
    //     }
    // }
    bio:
    {
        type: String
    },
     profilePicture: {
      url: { type: String, default: "" }, // Image URL (stored from S3, Cloudinary, or your local server)
      public_id: { type: String, default: "" }, // For deletion if using Cloudinary
    },
    
    portfolioLink:  [
        {
            url: String,
            type: String
        }
    ],

    availability: [
    {
        date: {
        type: Date,
        required: true,
        },
        status: {
        type: String,
        enum: ["available", "booked", "unavailable"],
        default: "available",
        },
    },
    ],
    wage: {
        type: Number,
        required: true,
        min: 1000,
        default: 0 // or set a default artist rate
    },

     media: [
      {
        url: { type: String, required: true }, // image or video URL
        type: {
          type: String,
          enum: ["image", "video"], // helps identify media type
          required: true,
        },
        public_id: { type: String, default: "" }, // for deletion from Cloudinary/local storage
      },
    ],
   
},
{timestamps: true});

//pre-save hook to hash pw before saving to db
artistSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

artistSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const Artist =  mongoose.model("Artist", artistSchema)

export default Artist;