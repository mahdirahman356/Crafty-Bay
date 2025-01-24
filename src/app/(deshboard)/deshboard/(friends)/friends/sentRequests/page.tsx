"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
// import { RiUserSharedLine } from "react-icons/ri";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Key } from "react";

type Data = {
    _id: string,
    sentRequestTo: {
        userEmail: string,
        userName: string,
        userImage: string,
        role: string
    }
    status: string,
    date: string,
}

const page = () => {

    const { data: session } = useSession()


    const { data: sentRequestsData = [], refetch } = useQuery({
        queryKey: ["sentRequestsData", session?.user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/requests/api/getSentRequest?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    const handleCancelRequest = async(_id: string) => {
           try {

            const res = await axios.delete(`http://localhost:3000/requests/api/cancelRequest/${_id}`)
            console.log(res.data)
            refetch()

            
           } catch (error) {
            console.log(error)
           }
           
    }


    return (
        <div className="md:w-[95%] mx-auto text-gray-900">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Cancel request</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {sentRequestsData.map((data: Data, index: Key | null | undefined) => <tr key={index} className="text-nowrap">
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={data.sentRequestTo.userImage ? data.sentRequestTo.userImage : "/image/user.avif"}
                                                alt="profile" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{data.sentRequestTo.userName}</div>
                                        <div className="text-sm opacity-50">{data.sentRequestTo.role}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex gap-2 text-nowrap">
                                    <p className="text-sm text-gray-500 text-nowrap">{data.date.split('T')[0]}</p>
                                    <p className="text-sm text-gray-500 text-nowrap">{data.date.split('T')[1].split('.')[0]}</p>
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-sm">
                                    <span onClick={() => handleCancelRequest(data._id)} className="font-thin	text-sm text-primary">
                                        Cancel request
                                    </span>
                                </button>
                            </td>
                            <th>
                                <Link href={`/usersProfile/${data.sentRequestTo.userEmail}`}>
                                    <button className="btn btn-ghost btn-xs">view profile</button>
                                </Link>

                            </th>
                        </tr>)}

                    </tbody>
                </table>
            </div>



            {/* <div className="h-[80vh] text-gray-800 flex flex-col gap-4 justify-center items-center">
                <RiUserSharedLine className='text-8xl' />
                <div className="text-center">
                    <p className="">No sent requests</p>
                    <p className="text-gray-600 text-sm md:text-base">You don't sent any friend requests</p>
                </div>
            </div> */}
        </div>
    );
};

export default page;