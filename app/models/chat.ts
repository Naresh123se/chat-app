import mongoose, { Schema, Document } from "mongoose";

export interface Chat extends Document {
    members: mongoose.Types.ObjectId[];
    messages: mongoose.Types.ObjectId[];
    isGroup: boolean;
    name: string;
    groupPhoto: string;
    createdAt: Date;
    lastMessageAt: Date;
    chats: mongoose.Types.ObjectId[];
}

const ChatSchema: Schema<Chat> = new mongoose.Schema({
    members: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    messages: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        default: []
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: ''
    },
    groupPhoto: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
    }
})

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
export default Chat