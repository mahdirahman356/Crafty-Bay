"use client"
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import useRequestsData from '@/app/Hooks/useRequestsData';
import axios from 'axios';
import Link from 'next/link';
import React, { Key, useState } from 'react';
import { RiUserFollowLine } from 'react-icons/ri';
import { TbUsers } from 'react-icons/tb';
import Swal from 'sweetalert2';

type Data = {
    _id: string,
    requestFrom: {
        userEmail: string,
        userName: string,
        userImage: string,
        role: string
    }
    status: string,
    date: string,
}

const page = () => {

    const [loading, setLoading] = useState(false)


    const [requestsData, refetchRequests, isLoadingRequests] = useRequestsData()
    const filteredRequestsData: Data[] = requestsData.filter((requests: Data) => requests.status !== "friends") ?? []

    const [confirmedRequests, setConfirmedRequests] = useState<string[]>([])

    const handleRemoveRequest = async (_id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/requests/api/cancelRequest/${_id}`)
            console.log(res.data)
            refetchRequests()
            Swal.fire({
                title: "Removed",
                text: `Your friend request has been removed.`,
                icon: "success"

            })

        } catch (error) {
            console.log(error)
        }

    }

    const handleAcceptRequest = async (_id: string) => {
        setLoading(true)
        try {
            const res = await axios.patch('http://localhost:3000/requests/api/acceptRequest', { id: _id })
            console.log(res.data)
            setLoading(false)
            setConfirmedRequests((prev) => [...prev, _id])

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="w-[97%] md:w-[95%] mx-auto text-gray-900">

            {isLoadingRequests
                ? <div className="h-[80vh] flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div>
                    {filteredRequestsData.length === 0
                        ? <div className="h-[80vh] text-gray-800 flex flex-col gap-4 justify-center items-center">
                            <RiUserFollowLine className='text-8xl' />
                            <div className="text-center">
                                <p className="">No Requests</p>
                                <p className="text-gray-600 text-sm md:text-base">You don't have any friend requests</p>
                            </div>
                        </div>
                        : <div>
                            <div className='pl-4 flex items-center gap-2 mt-5 md:mt-10 mb-5'>
                                <h3 className='text-2xl font-semibold'>Friend Requests</h3>
                                <p className='text-primary font-semibold text-2xl'>{filteredRequestsData.length}</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}

                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Time</th>
                                            <th>Accept requests</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        {filteredRequestsData.map((data: Data, index: Key | null | undefined) => <tr key={index} className="text-nowrap">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={data.requestFrom.userImage ? data.requestFrom.userImage : "/image/user.avif"}
                                                                alt="profile" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{data.requestFrom.userName}</div>
                                                        <div className="text-sm opacity-50">{data.requestFrom.role}</div>
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
                                                <button className="btn btn-sm w-24">
                                                    <p onClick={() => handleAcceptRequest(data._id)} className="font-thin	text-sm text-primary">
                                                        {confirmedRequests.includes(data._id)
                                                            ? <span className='flex items-center gap-1'>
                                                                <TbUsers className='text-xl' />
                                                                Friend
                                                            </span>
                                                            : <span className='flex items-center gap-1'>
                                                                <RiUserFollowLine className='text-xl' />
                                                                {loading
                                                                    ? <span className="loading loading-dots loading-sm"></span>
                                                                    : "Confirm"}
                                                            </span>}
                                                    </p>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm w-20">
                                                    <span onClick={() => handleRemoveRequest(data._id)} className="font-thin text-sm text-primary">
                                                        Remove
                                                    </span>
                                                </button>
                                            </td>

                                            <th>
                                                <Link href={`/usersProfile/${data.requestFrom.userEmail}`}>
                                                    <button className="btn btn-ghost btn-xs">view profile</button>
                                                </Link>

                                            </th>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                </div>}
        </div>
    );
};

export default page;