import { DefaultSession } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User{
        _id: string;
        username?: string;
        profileImage?: string;

    }

    interface Session{
        user:{
            _id?: string;
            username?: string;
        profileImage?: string;

        }& DefaultSession['user']
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id?: string;
        username?: string;
        profileImage?: string;

    }
}