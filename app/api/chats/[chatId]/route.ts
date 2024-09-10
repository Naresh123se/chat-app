import Message from "@/app/models/Message";
import dbConnection from "@/app/lib/dbCon";
import UserModel from "@/app/models/user";
import Chat from "@/app/models/chat";


export const GET = async (req: Request, { params }: { params: { chatId: string } }) => {
  try {
    await dbConnection();

    const { chatId } = params;

    const chat = await Chat.findById(chatId)
      .populate({
        path: "members",
        model: UserModel,
      })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: UserModel,
        },
      })
      .exec();

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to get chat details", { status: 500 });
  }
};

export const POST = async (req: Request, { params }: { params: { chatId: string } }) => {
  try {
    await dbConnection();

    const { chatId } = params;

    const body = await req.json();

    const { currentUserId } = body;

    await Message.updateMany(
      { chat: chatId },
      { $addToSet: { seenBy: currentUserId } },
      { new: true }
    )
      .populate({
        path: "sender seenBy",
        model: UserModel,
      })
      .exec();

    return new Response("Seen all messages by current user", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update seen messages", { status: 500 });
  }
};


