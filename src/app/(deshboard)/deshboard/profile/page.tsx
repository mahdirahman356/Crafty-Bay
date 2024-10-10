/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import Image from 'next/image';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FiEdit3 } from "react-icons/fi";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import UpdateProfile from '@/app/UpdateProfile/UpdateProfile';
import { LiaBorderAllSolid } from 'react-icons/lia';

const profilePage = () => {
    const { data: session } = useSession()
    console.log(session?.user)

    const { data: userProfile = [], isLoading, refetch } = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/users?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    const { _id, name, email, location, contactNumber, image } = userProfile || {}

    return (
        <div className="">
            {isLoading ?
                <div className=" min-h-screen flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div className='w-[95%] mx-auto md:py-12 lg:py-0 lg:my-28 text-gray-800'>
                    < div className="flex">
                        <div className="p-8 sm:flex flex-wrap sm:space-x-6">
                            <div className="w-28 h-28 md:w-36 md:h-36 mb-3">
                                <Image
                                    src={image || session?.user?.image ? image || session?.user?.image : "/image/user.avif"}
                                    alt="profile"
                                    width={400}
                                    height={300}
                                    className="object-cover object-center w-full h-full border rounded-full dark:bg-gray-500"
                                />
                            </div>
                            <div className=" sm:flex sm:space-x-6">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold">{name ? name : "No name available"}</h2>
                                    <span className="text-sm dark:text-gray-600">Role {(session?.user as { role?: string }).role || "Not Assigned"}</span>
                                    <button className="btn rounded-full bg-primary text-white mt-3 flex" onClick={() => {
                                        (window as any)[`my_modal_update_profile`].showModal();
                                    }}><FiEdit3 className="text-[17px]" /></button>
                                    <dialog id="my_modal_update_profile" className="modal">
                                        <div className="modal-box">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                            </form>
                                            <UpdateProfile id={_id} location={location} contactNumber={contactNumber} image={image} refetch={refetch} ></UpdateProfile>
                                        </div>
                                    </dialog>
                                </div>
                                <div className="">
                                    <p className="mb-2 text-sm flex items-center gap-2"><IoMailOutline className="text-xl" />{email ? email : "No email available"}</p>
                                    <p className="mb-2 text-sm flex items-center gap-2"><IoLocationOutline className="text-xl" />{location ? location : "Add your location"}</p>
                                    <p className="mb-2 text-sm flex items-center gap-2"><IoCallOutline className="text-xl" />{contactNumber ? contactNumber : "Add your contact number"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='border-t-2'>
                        <p className='flex justify-center items-center mt-3'><LiaBorderAllSolid className='text-xl' />Posts</p>
                    </div>
                </div>}

        </div>
    );
};

export default profilePage;