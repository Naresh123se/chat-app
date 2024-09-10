import User from "@/app/models/user"
import dbConnection from "@/app/lib/dbCon";


export const GET = async (req: Request, { params }: { params: { query: string } }) => {
  try {
    await dbConnection()

    const { query } = params

    const searchedContacts = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    })

    return new Response(JSON.stringify(searchedContacts), { status: 200 })
  } catch (err) {
    return new Response("Failed to search contact", { status: 500 })
  }
}