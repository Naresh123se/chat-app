import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnection(): Promise<void> {
    if (connection.isConnected) {
        console.log("already connected")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODN_URI || '')
        connection.isConnected = db.connections[0].readyState
        console.log("conn");

    } catch (error) {
        console.log("error: ", error);
        process.exit(1)
    }
}

export default dbConnection;