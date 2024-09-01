'use client'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'

const Profile = () => {
    const { data: session } = useSession()
    const user = session?.user

    const {register, watch, setValue, handleSubmit, formState:{errors}, } = useForm()

    return (
        <div className='profile-page'>
            <h1>Edit Your Profile</h1>

            <form className='edit profile'>
                <div className="input">
                    <input {...register('username',{
                        required: 'username is required',
                    })} type="text" placeholder='username' className='input-field' />
                </div>
                <div className="flex items-center justify-center">
                    <Image src={user?.profileImage || "/default.jpg"} alt='image' width={40} height={40}>
                    </Image>
                    <p className='text-bold'>Upload new photo</p>
                </div>
                <Button className='btn' type='submit' >
                    Save Change
                </Button>
            </form>
        </div>
    )
}

export default Profile