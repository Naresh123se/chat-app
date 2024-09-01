'use client'
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "./button"
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"


type Login = {
    username: string
    email: string
    password: string
}
interface FormProps {
    type: "login" | "register"
}


export default function Form({ type }: FormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>()
    const router = useRouter();
    const [loader, setLoader] = useState(false)
    const { toast } = useToast();


    const onSubmit: SubmitHandler<Login> = async (data) => {
        if (type === "register") {
            setLoader(true);
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) {
                    const errorData = await res.json(); // Assuming the API returns JSON with error details
                    console.error("An error occurred:", errorData.message);
                    toast({
                        title: 'Error registering',
                    })
                    return;
                }
                router.push('/');

            } catch (error) {
                console.error("An error occurred:", (error as Error).message);
            } finally {

                setLoader(false);
            }
        }

        if (type === "login") {
            const res = await signIn("credentials", {
                ...data,
                redirect: false,
            })

            if (res?.ok) {
                router.push("/chats");
            }

            if (res?.error) {
                toast({
                    title: "Error",
                    description: 'Invalid Users',
                    variant: 'default',
                    className: 'text-[white] bg-red-500'
                })
            }
        }
    };



    return (
        <div className="flex justify-center p-4 sm:p-8">
            {type === "register" && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 sm:gap-6 w-full max-w-md bg-slate-300 p-6 rounded-lg shadow-lg"
                >
                    <input
                        defaultValue=''
                        {...register("username", { required: true, maxLength: 20 })}
                        placeholder="Enter your username"
                        className="p-2 border rounded"
                    />
                    {errors.username && <span className="text-red-600">Username is required and must be less than 20 characters</span>}
                    <input
                        defaultValue=''
                        {...register("email", { required: true, maxLength: 20 })}
                        placeholder="jhon@example.com"
                        className="p-2 border rounded"
                        type="email"
                    />
                    {errors.username && <span className="text-red-600">Username is required and must be less than 20 characters</span>}

                    <input
                        defaultValue=''
                        {...register("password", { required: true, maxLength: 20 })}
                        type="password"
                        className="p-2 border rounded"
                    />
                    {errors.password && <span className="text-red-600">Password is required and must be less than 20 characters</span>}
                    <Button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"   >
                        Register
                    </Button>
                    {loader && (
                        <Loader2 className="animate-spin " />
                    )}
                    <Link href='/' className="link">Login </Link>
                </form>
            )}

            {type === "login" && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 sm:gap-6 w-full max-w-md bg-slate-300 p-6 rounded-lg shadow-lg"
                >
                    <input
                        defaultValue=''
                        {...register("username", { required: true, maxLength: 20 })}
                        placeholder="Enter your username"
                        className="p-2 border rounded"
                    />
                    {errors.username && <span className="text-red-600">Username is required and must be less than 20 characters</span>}

                    <input
                        defaultValue=''
                        {...register("password", { required: true, maxLength: 20 })}
                        type="password"
                        className="p-2 border rounded"
                    />
                    {errors.password && <span className="text-red-600">Password is required and must be less than 20 characters</span>}

                    <input
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
                    />
                    <Link href='/register' className="link">Register </Link>
                </form>
            )}

        </div>
    )
}
