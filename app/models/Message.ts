import mongoose, { Schema, Document } from "mongoose"

export interface Message extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: string;
    photo: string;
    createdAt: Date;
    seenBy: mongoose.Types.ObjectId[];
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    text: {
        type: String,
        default: "",
    },
    photo: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    seenBy: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }
})

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)

export default Message