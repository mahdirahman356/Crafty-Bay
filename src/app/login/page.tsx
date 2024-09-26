/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialSignIn from "../components/Shared/SocialSignIn";

const page = () => {
    const router = useRouter()
    const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const user:object = {
             email: email,
             password: password,
        }
        console.log(user)

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        console.log(res)
        if(res?.status === 200){
             router.push("/")
        }

 }

    return (
        <div className="min-h-screen bg-white text-slate-800 flex justify-center items-center">
            <div className=" md:w-[50%] lg:w-[40%] p-10 border-[#b4b3b3] rounded-sm mt-28">
                <form onSubmit={handlelogin} className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-center">Sign in</h3>
                    <label className="input rounded-3xl input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="email" 
                        placeholder="Email Address" 
                        name="email"
                        className="grow" 
                        required/>
                    </label>


                    <label className="input rounded-3xl input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        className="grow" 
                        required/>
                    </label>

                    <button type="submit" className="btn w-full text-white btn-primary rounded-3xl">
                        Continue
                    </button>
                </form>
               <div className="space-y-6 mt-4">
               <p className="text-sm text-center">____________or____________</p>
                    <SocialSignIn />
                    <p className="text-sm text-center">Do not have an account ? <span className="text-primary underline"><Link href={"/signup"}>create account</Link></span></p>
               </div>
            </div>
        </div>
    );
};

export default page;