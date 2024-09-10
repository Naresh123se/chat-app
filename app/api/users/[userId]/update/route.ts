import dbConnection from "@/app/lib/dbCon";
import UserModel from "@/app/models/user";

export const POST = async (req: Request, { params }: { params: {userId:string} }) => {
    try {
        await dbConnection();

        const { userId } = params;
        const body = await req.json();
        const { username, profileImage } = body;
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                username,
                // profileImage,
            },
            { new: true }
        );

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response("Failed to update user", { status: 500 })
    }
};