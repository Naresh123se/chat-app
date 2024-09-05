'use client'
import Chatlist from "@/components/ui/ChatList"
import { useSession } from "next-auth/react"

const Chat = () => {
  return (
    <div className="">
       <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
      <Chatlist/>
      </div>

    </div>
  )
}

export default Chat