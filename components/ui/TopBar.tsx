'use client'
import { LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'



const TopBar = () => {
    const pathname = usePathname()
    console.log(pathname)

    const handleLogOut = async () => {
        signOut({ callbackUrl: '/' })
    }

    const { data: session } = useSession()
    const user = session?.user;
    return (
        <div className='topBar flex justify-between'>
            <Link href='/chats'>
                logo
            </Link>
            <div className="menu flex flex-row  gap-10">
                <Link href='/chats' className={`${pathname === '/chats' ? ' text-red-500' : ''}`}>Chats</Link>
                <Link href='/contact' className={`${pathname === '/contact' ? ' text-red-500' : ''}`}>Contacts</Link>
            </div>
            <div>
                <LogOutIcon className='pointer' onClick={handleLogOut} />
            </div>

            <Image src={user?.profileImage || '/default.jpg'} alt='profile' width={40} height={40} className=' rounded-3xl'></Image>
        </div>
    )
}

export default TopBar