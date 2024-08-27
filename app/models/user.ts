import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    profileImage: string;
    chats: mongoose.Types.ObjectId[];

}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: 'string',
        required: [true, 'username is required'],
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

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', UserSchema)
export default UserModel


