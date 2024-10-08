import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnection from "@/app/lib/dbCon";
import UserModel from "@/app/models/user";
import { NextAuthOptions, Session } from "next-auth";

interface MongoUser {
    _id: string;
    email: string;
    password: string;
    [key: string]: any; // Additional fields in user document
  }

const authOptions: NextAuthOptions = {
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text ", placeholder: "Smith" },
            password: { label: "Password", type: "password ", placeholder: "" },
        },
        //
        async authorize(credentials: any): Promise<any> {
            await dbConnection()
            try {
                const user = await UserModel.findOne({
                    $or: [
                        { email: credentials.username }, { username: credentials.username }
                    ]
                })
                if (!user) {
                    throw new Error("User not found")
                    console.log("first login failed")
                }

                // if (!user.isVerified) {
                //     throw new Error("User is not verified")
                // }

                const isPassword = await bcrypt.compare(credentials.password, user.password)

                if (isPassword) {
                    return user
                } else {
                    throw new Error("Invalid");
                }

            } catch (err: any) {
                console.log(err.message)
                throw new Error("Error", err)
            }
        }
    })],

    // callbacks: {
    //     async jwt({ token, user,session, trigger }) {
    //         if(trigger === 'update' && session?.username){
    //             token.username = session.username
    //         }
    //         if (user) {
    //             token._id = user._id?.toString()
    //             token.username = user.username
    //         }
    //         return token;
    //     },
    //     async session({ session, token }) {
    //         if (token) {
    //             session.user._id = token._id
    //             session.user.username = token.username
    //         }
    //         return session
    //     }
    // },

    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token._id = user._id?.toString();
            token.username = user.username;
          }
      
          return token;
        },
      
        async session({ session, token }) {
          // Fetch additional user data from MongoDB based on session email
          const mongodbUser = await UserModel.findOne({ email: session.user?.email }) as MongoUser;
      
        //   if (mongodbUser) {
        //     session.user = {
        //       ...session.user,
        //       ...mongodbUser._doc,
        //       id: mongodbUser._id.toString(),
        //     };
        //   }
      
          // Also, populate session with token information
          if (token) {
            session.user._id =  mongodbUser._id.toString()
            session.user.username = mongodbUser.username;
          }
      
          return session;
        }
      },
      
    pages: {
        signIn: '/',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }