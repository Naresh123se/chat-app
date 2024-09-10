import { pusherServer } from "@/lib/pusher";
import Message from "@/app/models/Message";
import dbConnection from "@/app/lib/dbCon";
import UserModel from "@/app/models/user";
import Chat from "@/app/models/chat";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body = await req.json();
    const { chatId, currentUserId, text, photo } = body;
    const currentUser = await UserModel.findById(currentUserId);

    const newMessage = await Message.create({
      chat: chatId,
      sender: currentUser,
      text,
      photo,
      seenBy: currentUserId,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: newMessage._id },
        $set: { lastMessageAt: newMessage.createdAt },
      },
      { new: true }
    )
      .populate({
        path: "messages",
        model: Message,
        populate: { path: "sender seenBy", model: "User" },
      })
      .populate({
        path: "members",
        model: "User",
      })
      .exec();

    /* Trigger a Pusher event for a specific chat about the new message */
    await pusherServer.trigger(chatId, "new-message", newMessage)

    /* Triggers a Pusher event for each member of the chat about the chat update with the latest message */
    const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
    updatedChat.members.forEach(async (member: any) => {
      try {
        await pusherServer.trigger(member._id.toString(), "update-chat", {
          id: chatId,
          messages: [lastMessage]
        });
      } catch (err) {
        console.error(`Failed to trigger update-chat event`);
      }
    });

    return new Response(JSON.stringify(newMessage), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create new message", { status: 500 });
  }
};
