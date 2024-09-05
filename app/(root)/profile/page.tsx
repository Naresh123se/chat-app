'use client'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Profile = () => {
    const { data: session, update } = useSession()
    const user = session?.user
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    useEffect(() => {
        if (user) {
            reset({
                username: user?.username,
                profileImage: user?.profileImage,
            });
        }
    }, [user, reset]);

    // if (loading) return <div>Loading...</div>;
    const updateUser = async (data:any) => {
        setLoading(true);
        try {
          const res = await fetch(`/api/users/${user?._id}/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className='flex justify-center mt-10'>
            <div className='profile-page flex flex-col justify-center gap-5 border  p-10 shadow-lg rounded-md'>
                <h1 className='font-semibold text-3xl'>Edit Your Profile</h1>
                <form className='edit-profile flex flex-col gap-10' onSubmit={handleSubmit(updateUser)}>
                    <div>
                        <input
                            {...register('username', {
                                required: 'Username is required',
                            })}
                            type="text"
                            placeholder='Username'
                            className='input-field ring-1 ring-gray-400'
                        />
                        {errors.username && <p className='text-red-500'>
                            error</p>}
                    </div>
                    <div className="flex items-end justify-center gap-5 bg-red  ">
                        <Image
                            src={user?.profileImage || "/default.jpg"}
                            alt='profile'
                            width={60}
                            height={60}
                            className='rounded-3xl'
                        />
                        <p className='text-bold'>Upload new photo</p>
                    </div>
                    <Button className='btn' type='submit'>
                    {loading && (
                            <>
                                <Loader2 className='animate-spin pt-0.5 pl-1' />
                            </>
                        )
                        }
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Profile
