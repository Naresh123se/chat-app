'use client'
import Chatlist from "@/components/ui/ChatList"
import Contacts from "@/components/ui/Contacts"

const Chat = () => {
  return (
    <div className="">
       <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
      <Chatlist/>
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
        <Contacts />
      </div>
    </div>
  )
}

export default Chat