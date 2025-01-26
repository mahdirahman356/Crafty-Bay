/* eslint-disable @next/next/no-img-element */
"use client"
import BuyerUsersPosts from "@/app/BuyerUsersPosts/BuyerUsersPosts";
import useProfile from "@/app/Hooks/useProfile";
import useRequestsData from "@/app/Hooks/useRequestsData";
import useSentRequestsData from "@/app/Hooks/useSentRequestsData";
import UsersPosts from "@/app/UsersPosts/UsersPosts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { LiaBorderAllSolid } from "react-icons/lia";
import { RiDeleteBin5Line, RiUserFollowLine } from "react-icons/ri";
/* eslint-disable react-hooks/rules-of-hooks */

interface Params {
    email: string
}

const page = ({ params }: { params: Params }) => {

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

    const isSentRequest = sentRequestsData.map((request: { sentRequestTo: { userEmail: string }; }) => request.sentRequestTo.userEmail);
    const isRequested = requestsData.map((request: { requestFrom: { userEmail: string }; }) => request.requestFrom.userEmail);

    const { name, email, role, location, contactNumber, image } = usersProfile || {}
    const { name: myName, email: myEmail, role: myRole, image: myImage } = profile || {}


    const handleFrinedRequests = async () => {
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
                                        {isSentRequest.includes(email)
                                            ? <button className="btn">
                                                Cancel Requests
                                            </button>
                                            : <>
                                                {isRequested.includes(email)
                                                    ? <div className="dropdown">
                                                        <div tabIndex={0} role="button" className="btn m-1">Respond</div>
                                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                            <li>
                                                                <a>
                                                                    <RiUserFollowLine className='text-xl' />
                                                                    Confirm
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a>
                                                                    <RiDeleteBin5Line className="text-xl" />
                                                                    Remove
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    : <button onClick={handleFrinedRequests} className="btn">
                                                        Add Friend
                                                    </button>}

                                            </>}
                                        <button className="btn">Message</button>
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