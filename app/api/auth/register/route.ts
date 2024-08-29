import dbConnection from "@/app/lib/dbCon";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        // Connect to the database
        await dbConnection();

        const body = await req.json();
        console.log(body)
        const { username, email, password } = body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ success: false, message: 'User already exists' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        return new Response(JSON.stringify({ success: true, message: 'User created' }), {
            status: 201, // 201 is more appropriate for resource creation
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error, "Error");
        return new Response(JSON.stringify({ success: false, message: 'Failed to create a new user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
