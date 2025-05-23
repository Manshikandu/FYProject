import mongoose from 'mongoose';


const artistSchema = new mongoose.Schema({
    // userId:
    // { 
    //     // type: mongoose.Schema.Types.ObjectId, 
    //     type: String, 
    //     ref: 'User',
    //     required: true
    // },
    name:
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    style:
    {
        type: String
    },
    location:
    {
        type: String,
        required: true
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
    
},
{timestamps: true});

const Artist =  mongoose.model("Artist", artistSchema)

export default Artist;