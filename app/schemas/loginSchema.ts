import { z } from "zod";
const loginSchema=  z.object({
    username:z.string().min(3, {message:"username must be at least 3 characters"}),
    email:z.string().email({message:"Invalid email"})
});
module.exports = loginSchema;