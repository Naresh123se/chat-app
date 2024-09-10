import User from "@/app/models/user"
import dbConnection from "@/app/lib/dbCon";


export const GET = async (req:Request, res:Response) => {
  try {
    await dbConnection()

    const allUsers = await User.find()

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}