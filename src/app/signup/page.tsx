/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialSignIn from "../SocialSignIn/SocialSignIn";
import Swal from "sweetalert2";
import axios from "axios";
const page = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        const form = e.target as HTMLFormElement
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const role = (form.elements.namedItem("role") as HTMLInputElement).value;
        

        const newUser: object = {
            name: name,
            role: role,
            email: email,
            password: password,
        }
        console.log(newUser)

        try {
            const res = await axios.post("/signup/api", newUser)
            console.log(res.data)
            setLoading(false);
            if (res.data.message === "User Exists") {
                Swal.fire({
                    title: 'Account Already Exists!',
                    text: 'It looks like you already have an account with this email. Please log in instead.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Go to Login',
                    cancelButtonText: 'Close',
                    allowOutsideClick: false,
                    customClass: {
                        confirmButton: 'btn btn-primary rounded-sm text-white ',
                        cancelButton: 'btn btn-secondary rounded-sm text-white '
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/login")
                    }
                });
            }
            if (res.data.acknowledged) {
                Swal.fire({
                    title: 'Account Created Successfully!',
                    text: 'Please log in to continue and explore CraftyBay.',
                    icon: 'success',
                    confirmButtonText: 'Go to Login',
                    allowOutsideClick: false,
                    customClass: {
                        confirmButton: 'btn btn-primary rounded-sm text-white ',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/login")
                    }
                });
            }

        } catch (error) {
            setLoading(false);
            console.log(error)
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    customClass: {
                        confirmButton: 'btn btn-primary rounded-sm text-white ',
                    },
                });
            }
        }


    }

    return (
        <div className="min-h-screen bg-white text-slate-800 flex justify-center items-center">
            <div className="md:w-[50%] lg:w-[40%] p-10 border-[#b4b3b3] rounded-sm">
                <form onSubmit={handleSignUp} className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-center">Sign Up</h3>

                    <label className="input rounded-3xl input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text"
                            placeholder="Name"
                            name="name"
                            className="grow"
                            required />
                    </label>

                    <label className="form-control w-full relative">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 absolute left-4 top-4"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <select name="role" className="select border-gray-300 rounded-3xl pl-10 text-gray-400 text-[17px]">
                            <option disabled selected value=''>
                                Seller or Buyer
                            </option>
                            <option value="seller">Seller</option>
                            <option value="buyer">Buyer</option>
                        </select>
                    </label>

                    <label className="input rounded-3xl input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email"
                            placeholder="Email Address"
                            name="email"
                            className="grow"
                            required />
                    </label>


                    <label className="input rounded-3xl input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="grow"
                            required />
                    </label>

                    <button type="submit" className="btn w-full text-white btn-primary rounded-3xl">
                        {loading ?
                            <span className="loading loading-spinner loading-sm"></span> :
                            "Continue"}
                    </button>
                </form>
                <div className="space-y-6 mt-4">
                    <p className="text-sm text-center">____________or____________</p>
                    <SocialSignIn />

                    <p className="text-sm text-center">Already have an account ? <span className="text-primary underline"><Link href={"/login"} prefetch={true}>Login</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default page;