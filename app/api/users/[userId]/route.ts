import dbConnection from "@/app/lib/dbCon";
import Chat from "@/app/models/chat";
import Message from "@/app/models/Message";
import User from "@/app/models/user";

export const GET = async (req:Request, { params }:{params:{userId:string}}) => {
  try {
    await dbConnection();

    const { userId } = params;

    const allChats = await Chat.find({ members: userId })
      .sort({ lastMessageAt: -1 })
      .populate({
        path: "members",
        model: User,
      })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: User,
        },
      })
      .exec();

    return new Response(JSON.stringify(allChats), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get all chats of current user", {
      status: 500,
    });
  }
};
