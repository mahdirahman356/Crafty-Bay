/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from "react";
import Link from "next/link";
import useAxiosCommon from "../Hooks/useAxiosCommon"
const page = () => {
    const axiosCommon = useAxiosCommon()
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
           e.preventDefault()
           const form = e.target as HTMLFormElement
           const name = (form.elements.namedItem("name") as HTMLInputElement).value;
           const email = (form.elements.namedItem("email") as HTMLInputElement).value;
           const password = (form.elements.namedItem("password") as HTMLInputElement).value;

           const newUser:object = {
                name: name,
                email: email,
                password: password,
           }
           console.log(newUser)

          try {
            const res = await axiosCommon.post("/signup/api", newUser)
            console.log(res.data)
          } catch (error) {
            console.log(error)
          }


    }

    return (
        <div className="min-h-screen bg-white text-slate-800 flex justify-center items-center">
            <div className="w-[90%] md:w-[50%] lg:w-[30%] border p-10 border-[#b4b3b3] rounded-sm">
                <form onSubmit={handleSignUp} className="space-y-9">
                    <h3 className="text-2xl font-bold">create account</h3>
                    <div>
                        <input type="text" 
                        placeholder="Name" 
                        name="name"
                        className="bg-white grow w-full pl-1 py-3 border-b-2 border-gray-300 pb-1 focus:border-primary outline-none rounded-none" />
                    </div>

                    <div>
                        <input type="email" 
                        placeholder="Email Address" 
                        name="email"
                        className="bg-white grow w-full pl-1 py-3 border-b-2 border-gray-300 pb-1 focus:border-primary outline-none rounded-none" />
                    </div>

                    <div>
                        <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        className="bg-white grow w-full pl-1 py-3 border-b-2 border-gray-300 pb-1 focus:border-primary outline-none rounded-none" />
                    </div>

                    <button type="submit" className="btn w-full rounded-none text-white btn-primary">
                        Sign up
                    </button>

                    <p className="text-sm text-center">Already have an account ? <span className="text-primary underline"><Link href={"/login"}>Login</Link></span></p>

                </form>
            </div>
        </div>
    );
};

export default page;