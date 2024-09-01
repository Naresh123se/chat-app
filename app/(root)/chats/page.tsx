'use client'
import { useSession } from "next-auth/react"


const Chat = () => {
    const{data:session} = useSession()
    console.log(session)
  return (
    <div>Chat</div>
  )
}

export default Chat