import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Name is required"]
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
        trim: true
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
   citizenshipNo: {
        type: String,
        required: [true, "Citizenship number is required"],
        unique: true,
        match: [/^\d{8,10}$/, "Invalid citizenship number (must be 8-10 digits)"]
    },

    role:{
        type: String,
        enum: ["client","artist","admin"],
        default: "client"
    },
    category: {
        type: String,
        enum: ["Musician","Singer", "Dancer", "DJ","MC", "Photography", "Other"], 
        required: function() { return this.role === "artist"; }  
    },
    location: {
        type: String,
        required: function () {
        return this.role === "artist";
        }
    },
    style:
    {
        type: String
    },
    bio:
    {
        type: String
    },
    portfolioLinks: [String],

    availability: [String],
    media:
    [
        {
            url: String,
            type: String
        }
    ],
    ratings:
    {
        type: Number,
        default: 0
    },
    reviews:
    [
        {
            userId: String, 
            comment: String,
            rating: Number 
        }
    ],
    }
,{
    timestamps: true
});

//pre-save hook to hash pw before saving to db
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})
  
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
