import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    profileImage: {
        type: 'string',
        default: "",
    },
    chats: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
        default: [],
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;


