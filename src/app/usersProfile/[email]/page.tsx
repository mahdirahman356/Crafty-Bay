/* eslint-disable @next/next/no-img-element */
"use client"
import BuyerUsersPosts from "@/app/BuyerUsersPosts/BuyerUsersPosts";
import useProfile from "@/app/Hooks/useProfile";
import useRequestsData from "@/app/Hooks/useRequestsData";
import useSentRequestsData from "@/app/Hooks/useSentRequestsData";
import UsersPosts from "@/app/UsersPosts/UsersPosts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LiaBorderAllSolid } from "react-icons/lia";
/* eslint-disable react-hooks/rules-of-hooks */

interface Params {
    email: string
}

type Data = {
    _id: string,
    sentRequestTo: {
        userEmail: string,
        userName: string,
        userImage: string,
        role: string
    },
    requestFrom: {
        userEmail: string,
        userName: string,
        userImage: string,
        role: string
    },
    status: string,
    date: string,
}

const page = ({ params }: { params: Params }) => {

    const [loading, setLoading] = useState(false)
    const [profile,] = useProfile();
    const [sentRequestsData, refetchSentRequests] = useSentRequestsData()
    const [requestsData, refetchRequests] = useRequestsData()


    const { data: usersProfile = [], isLoading } = useQuery({
        queryKey: ["usersProfile", params.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/users?email=${params.email}`)
            console.log(data)
            return data
        }
    })

    const sentRequestEmail = sentRequestsData.map((request: { sentRequestTo: { userEmail: string }; }) => request.sentRequestTo.userEmail);
    const requestedEmail = requestsData.map((request: { requestFrom: { userEmail: string }; }) => request.requestFrom.userEmail);

    const filteredRequestsData: Data[] = requestsData.filter((requests: Data) => requests.status === "friends") ?? []
    const filteredRequestedEmail = filteredRequestsData.map((request: { requestFrom: { userEmail: string }; }) => request.requestFrom.userEmail);

    const filteredSentRequestsData: Data[] = sentRequestsData.filter((requests: Data) => requests.status === "friends") ?? []
    const filteredSentRequestedEmail = filteredSentRequestsData.map((request: { sentRequestTo: { userEmail: string }; }) => request.sentRequestTo.userEmail);

    const { name, email, role, location, contactNumber, image } = usersProfile || {}
    const { name: myName, email: myEmail, role: myRole, image: myImage } = profile || {}


    const handleFrinedRequests = async () => {
        setLoading(true)
        const sentRequestsData = {
            sentRequestTo: {
                userEmail: email,
                userName: name,
                userImage: image,
                role: role
            },
            requestFrom: {
                userEmail: myEmail,
                userName: myName,
                userImage: myImage,
                role: myRole
            },
            status: "request",
            date: new Date(),
        }
        console.log(sentRequestsData)

        try {
            const res = await axios.post("http://localhost:3000/requests/api/sentRequests", sentRequestsData)
            console.log(res.data)
            refetchSentRequests()
            refetchRequests()
            setLoading(false)

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className="w-[95%] md:w-[80%] mx-auto pt-10">
            {isLoading
                ? <div className="min-h-screen flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div className='md:py-12 lg:py-0 lg:my-10 text-gray-800'>
                    < div className="flex">
                        <div className="p-8 flex flex-col md:flex-row sm:space-x-6">
                            <div className="w-28 h-28 md:w-36 md:h-36 mb-3">
                                <img
                                    src={image ? image : "/image/user.avif"}
                                    alt="profile"
                                    width={400}
                                    height={300}
                                    className="object-cover object-center w-full h-full border rounded-full dark:bg-gray-500"
                                />
                            </div>
                            <div className="sm:flex sm:space-x-6">
                                <div className="mb-6 flex flex-col gap-5 md:gap-0">
                                    <div>
                                        <h2 className="text-2xl font-semibold">{name}</h2>
                                        <span className="text-sm dark:text-gray-600">Role {role}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        {filteredRequestedEmail.includes(email) || filteredSentRequestedEmail.includes(email)
                                            ? <>
                                                <button className="btn btn-sm text-xs text-primary">
                                                    <Link href={'/deshboard/friends/allFriends'}>
                                                        Friends
                                                    </Link>
                                                </button>
                                            </>
                                            : <>
                                                {sentRequestEmail.includes(email)
                                                    ? <button className="btn btn-sm w-28 text-nowrap text-xs text-primary">
                                                        <Link href={"/deshboard/friends/sentRequests"}>
                                                            Cancel Requests
                                                        </Link>
                                                    </button>
                                                    : <>
                                                        {requestedEmail.includes(email)
                                                            ? <button className="btn btn-sm text-xs text-primary">
                                                                <Link href={"/deshboard/friends/friendRequests"}>
                                                                    Respond
                                                                </Link>
                                                            </button>
                                                            : <button onClick={handleFrinedRequests} className="btn btn-sm w-24 text-xs text-primary text-nowrap">
                                                                 {loading
                                                                    ? <span className="loading loading-dots loading-sm"></span>
                                                                    : "Add Friend"}
                                                            </button>}

                                                    </>}
                                            </>}

                                        <button className="btn btn-sm text-xs text-primary">Message</button>
                                    </div>
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
                        {role === "buyer"
                            ? <BuyerUsersPosts buyerUsersEmail={params.email} />
                            : <UsersPosts userEmail={params.email || ""} />
                        }
                    </div>

                </div>}

        </div>
    );
};

export default page;