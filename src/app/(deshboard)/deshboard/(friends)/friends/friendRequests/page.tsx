"use client"
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import useRequestsData from '@/app/Hooks/useRequestsData';
import axios from 'axios';
import Link from 'next/link';
import React, { Key } from 'react';
import { RiUserFollowLine } from 'react-icons/ri';

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

    const [requestsData, refetchRequests, isLoading] = useRequestsData()

    const handleRemoveRequest = async (_id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/requests/api/cancelRequest/${_id}`)
            console.log(res.data)
            refetchRequests()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="md:w-[95%] mx-auto text-gray-900">

            {isLoading
                ? <div className="h-[80vh] flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div>
                    {requestsData.length === 0
                        ? <div className="h-[80vh] text-gray-800 flex flex-col gap-4 justify-center items-center">
                            <RiUserFollowLine className='text-8xl' />
                            <div className="text-center">
                                <p className="">No Requests</p>
                                <p className="text-gray-600 text-sm md:text-base">You don't have any friend requests</p>
                            </div>
                        </div>
                        : <div className="overflow-x-auto">
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
                                    {requestsData.map((data: Data, index: Key | null | undefined) => <tr key={index} className="text-nowrap">
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
                                            <button className="btn btn-sm">
                                                <span className="font-thin	text-sm text-primary">
                                                    Confirm
                                                </span>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm">
                                                <span onClick={() => handleRemoveRequest(data._id)} className="font-thin	text-sm text-primary">
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
                        </div>}
                </div>}
        </div>
    );
};

export default page;