// import mongoose from 'mongoose';

// const Admin = new mongoose.Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['client', 'admin'], default: 'client' },
// }, { timestamps: true });

// export default mongoose.model('User', Admin);


import mongoose from 'mongoose';

const AdminSchema  = new mongoose.Schema({
    username:
    {
        type: String,
        default : 'admin',
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: 'admin123',
        unique: true,
        required: true
    },

    // username: 'admin',
    // password: 'admin123',
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;