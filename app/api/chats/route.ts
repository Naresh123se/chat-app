import dbConnection from "@/app/lib/dbCon";
import Chat from "@/app/models/chat";
import UserModel from "@/app/models/user";
import { pusherServer } from "@/lib/pusher";

export const POST = async (req:Request) => {
  try {
    await dbConnection();

    const body = await req.json();

    const { currentUserId, members, isGroup, name, groupPhoto } = body;

    // Define "query" to find the chat
    const query = isGroup
      ? { isGroup, name, groupPhoto, members: [currentUserId, ...members] }
      : { members: { $all: [currentUserId, ...members], $size: 2 } };

    let chat = await Chat.findOne(query);

    if (!chat) {
      chat = await new Chat(
        isGroup ? query : { members: [currentUserId, ...members] }
      );

      await chat.save();

      const updateAllMembers = chat.members.map(async (memberId:any) => {
        await UserModel.findByIdAndUpdate(
          memberId,
          {
            $addToSet: { chats: chat._id },
          },
          { new: true }
        );
      }) 
      Promise.all(updateAllMembers);
      
      /* Trigger a Pusher event for each member to notify a new chat */
      chat.members.map(async (member:any) => {
        await pusherServer.trigger(member._id.toString(), "new-chat", chat)
      })
    }
    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new chat", { status: 500 })
  }
};
