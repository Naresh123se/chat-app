'use client'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Profile = () => {
    const { data: session } = useSession()
    const user = session?.user
    console.log(user)
    const [loading, setLoading] = useState(true);
    const { register, watch, setValue, handleSubmit, reset, formState: { errors }, } = useForm()

    useEffect(() => {
        if (user) {
            reset({
                username: user?.username,
                profileImage: user?.profileImage,
            });
        }
        setLoading(false);
    }, [user]);

    const update = async (data: any) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users/${user?._id}/update`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='flex justify-center mt-10 '>
            <div className='profile-page flex flex-col justify-center gap-5'>
                <h1 className='font-semibold text-3xl' >Edit Your Profile</h1>
                <form className='edit profile flex flex-col gap-10' onSubmit={handleSubmit(update)}>
                    <div className="">
                        <input {...register('username', {
                            required: 'username is required',
                        })} type="text" placeholder='username' className='input-field ring-1 ring-gray-400 ' />
                    </div>
                    <div className="flex items-end justify-center gap-5">
                        <Image src={user?.profileImage || "/default.jpg"} alt='profile' width={60} height={60}>
                        </Image>
                        <p className='text-bold '>Upload new photo</p>
                    </div>
                    <Button className='btn' type='submit' >
                        Save Change
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Profile