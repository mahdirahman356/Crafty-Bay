/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useSession } from "next-auth/react";
import { FiEdit3 } from "react-icons/fi";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import useProfile from "@/app/Hooks/useProfile";
import MyPost from "../deshboardComponents/MyPost/MyPost";
import UpdateProfile from "../deshboardComponents/UpdateProfile/UpdateProfile";
import AdminStats from "../deshboardComponents/AdminStats/AdminStats";
import Chart from "../deshboardComponents/Chart/Chart";
import SellerStats from "../deshboardComponents/SellerStats/SellerStats";

const profilePage = () => {
    const { data: session } = useSession()
    console.log(session?.user)

    const [profile, refetch, isLoading] = useProfile();
    const { _id, name, email, location, contactNumber, image } = profile || {}

    return (
        <div className="w-[98%] md:w-[90%] mx-auto">
            {isLoading
                ? <div className="min-h-screen flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div className="lg:mt-10 text-gray-800">
                    <div className="px-6 flex flex-col md:flex-row sm:space-x-6 mb-4">
                        <div className="w-28 h-28 md:w-36 md:h-36 mb-3">
                            <img
                                src={image || session?.user?.image ? image || session?.user?.image : "/image/user.avif"}
                                alt="profile"
                                width={400}
                                height={300}
                                className="object-cover object-center w-full h-full border rounded-full dark:bg-gray-500"
                            />
                        </div>
                        <div className="sm:flex sm:space-x-6">
                            <div className="mb-6 flex flex-row md:flex-col gap-5 md:gap-0 items-center md:items-start">
                                <div>
                                    <h2 className="text-2xl font-semibold">{name ? name : "No name available"}</h2>
                                    <span className="text-sm dark:text-gray-600">Role {(session?.user as { role?: string }).role || "Not Assigned"}</span>
                                </div>
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

                    {(session?.user as { role?: string }).role === "seller"
                        && <>
                            <div className="mb-4 px-6">
                                <SellerStats />
                            </div>
                        </>}

                    <div className='border-t-2'>
                        {(session?.user as { role?: string }).role === "Admin"
                            ? <>
                                <AdminStats />
                                <Chart />
                            </>
                            : <>
                                <MyPost />
                            </>}

                    </div>
                </div>}

        </div>
    );
};

export default profilePage;