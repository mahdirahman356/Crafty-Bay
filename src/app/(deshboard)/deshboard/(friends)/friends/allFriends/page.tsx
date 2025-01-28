/* eslint-disable @next/next/no-img-element */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useRequestsData from "@/app/Hooks/useRequestsData";
import useSentRequestsData from "@/app/Hooks/useSentRequestsData";
import axios from "axios";
import Link from "next/link";
import { Key } from "react";
import { TbUsers } from "react-icons/tb";
import Swal from "sweetalert2";

type Data = {
    _id: string,
    sentRequestTo: {
        userEmail: string,
        userName: string,
        userImage: string,
        role: string
    }
    requestFrom: {
        userEmail: string,
        userName: string,
        userImage: string,
        role: string
    },
    status: string,
    date: string,
}

const page = () => {

    const [requestsData, refetchRequests, isLoadingRequests] = useRequestsData()
    const [sentRequestsData, refetchSentRequests, isLoadingSentRequest] = useSentRequestsData()


    const filteredRequestsData: Data[] = requestsData.filter((requests: Data) => requests.status === "friends") ?? []
    const filteredSentRequestsData: Data[] = sentRequestsData.filter((requests: Data) => requests.status === "friends") ?? []

    const handleUnfriend = async (_id: string, userName: string) => {

        Swal.fire({
            title: "Are you sure?",
            text: `You want to remove ${userName} as your friend`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            customClass: {
                confirmButton: 'btn btn-primary rounded-sm text-white ',
                cancelButton: 'btn btn-secondary rounded-sm text-white '
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/requests/api/cancelRequest/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.status === 200) {
                            refetchRequests()
                            refetchSentRequests()
                            Swal.fire({
                                title: "Unfriend",
                                text: `You unfriended Aryan.`,
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }



    return (
        <div className="md:w-[95%] mx-auto text-gray-900">
            {isLoadingRequests || isLoadingSentRequest
                ? <div className="h-[80vh] flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div>
                    {filteredSentRequestsData.length === 0 && filteredRequestsData.length === 0
                        ? <div className="h-[80vh] text-gray-800 flex flex-col gap-4 justify-center items-center">
                            <TbUsers className='text-8xl' />
                            <div className="text-center">
                                <p className="">Add Friends</p>
                                <p className="text-gray-600 text-sm md:text-base">Send a request to connect with your friends</p>
                            </div>
                        </div>
                        : <div>
                            <div className='pl-4 flex items-center gap-2 mt-5 md:mt-10 mb-5'>
                                <h3 className='text-2xl font-semibold'>Friends</h3>
                                <p className='text-primary font-semibold text-2xl'>{filteredRequestsData.length + filteredSentRequestsData.length}</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                            <th>Unfriend</th>
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
                                                <span className='flex items-center gap-1'>
                                                    <TbUsers className='text-xl' />
                                                    {data.status === "friends" && "Friends"}
                                                </span>
                                            </td>
                                            <td>
                                                <button onClick={() => handleUnfriend(data._id, data.sentRequestTo.userName)} className="btn btn-sm font-thin	text-sm text-primary">
                                                    Unfriend
                                                </button>
                                            </td>
                                            <th>
                                                <Link href={`/usersProfile/${data.requestFrom.userEmail}`}>
                                                    <button className="btn btn-ghost btn-xs">view profile</button>
                                                </Link>

                                            </th>
                                        </tr>)}
                                        {filteredSentRequestsData.map((data: Data, index: Key | null | undefined) => <tr key={index} className="text-nowrap">
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
                                                <button className="btn btn-sm font-thin text-sm">
                                                    {data.status === "friends" && "Friends"}
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => handleUnfriend(data._id, data.sentRequestTo.userName)} className="btn btn-sm font-thin text-sm text-primary">
                                                    Unfriend
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
                        </div>}
                </div>}

        </div>
    );
};

export default page;