import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher';
interface Message {
    content: string;
    senderId: string;
    timestamp: string;
}

interface Chat {
    _id: string;
    name: string;
    messages: Message[];
}


const Chatlist = ({ currentChatId }) => {
    const { data: sessions } = useSession();
    const currentUser = sessions?.user;

    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState<Chat[]>([]);
    const [search, setSearch] = useState("");

    const getChats = async () => {
        try {
            const res = await fetch(
                search !== ""
                    ? `/api/users/${currentUser?._id}/searchChat/${search}`
                    : `/api/users/${currentUser?._id}`
            );
            const data = await res.json();
            setChats(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (currentUser) {
            getChats();
        }
    }, [currentUser, search]);

    useEffect(() => {
        if (currentUser?._id) {
            pusherClient.subscribe(currentUser._id);

            const handleChatUpdate = (updatedChat: { id: string; messages: Message[] }) => {
                setChats((allChats: Chat[]) =>
                    allChats.map((chat: Chat) => {
                        if (chat._id === updatedChat.id) {
                            return { ...chat, messages: updatedChat.messages };
                        } else {
                            return chat;
                        }
                    })
                );
            };

            const handleNewChat = (newChat: any) => {
                setChats((allChats) => [...allChats, newChat]);
            }

            pusherClient.bind("update-chat", handleChatUpdate);
            pusherClient.bind("new-chat", handleNewChat);

            return () => {
                if (currentUser?._id) {
                    pusherClient.unsubscribe(currentUser._id);
                    pusherClient.unbind("update-chat", handleChatUpdate);
                    pusherClient.unbind("new-chat", handleNewChat);
                }
            };
        }
    }, [currentUser]);



    return (
        <div>
            <input type="text" value={search} placeholder='search chat..' onChange={(e) => setSearch(e.target.value)} className='ring-1' />
        </div>
    )
}

export default Chatlist