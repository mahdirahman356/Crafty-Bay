"use client"
import useSentRequestsData from "@/app/Hooks/useSentRequestsData";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import Link from "next/link";
import { Key } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiUserSharedLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";

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

    const [sentRequestsData, refetchSentRequests, isLoadingSentRequest] = useSentRequestsData()
    const filteredSentRequestsData: Data[] = sentRequestsData.filter((requests: Data) => requests.status !== "friends") ?? []



    const handleCancelRequest = async (_id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/requests/api/cancelRequest/${_id}`)
            console.log(res.data)
            refetchSentRequests()
            Swal.fire({
                title: "Canceled!",
                text: `Your request has been canceled.`,
                icon: "success"

            })

        } catch (error) {
            console.log(error)
        }

    }




    return (
        <div className="md:w-[95%] mx-auto text-gray-900">
            {isLoadingSentRequest
                ? <div className="h-[80vh] flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <div>
                    {filteredSentRequestsData.length === 0
                        ? <div className="h-[80vh] text-gray-800 flex flex-col gap-4 justify-center items-center">
                            <RiUserSharedLine className='text-8xl' />
                            <div className="text-center">
                                <p className="">No sent requests</p>
                                <p className="text-gray-600 text-sm md:text-base">You don't sent any friend requests</p>
                            </div>
                        </div>
                        : <div>
                            <div className='pl-4 flex items-center gap-2 mt-5 md:mt-10 mb-5'>
                                <h3 className='text-2xl font-semibold'>Sent Requests</h3>
                                <p className='text-primary font-semibold text-2xl'>{filteredSentRequestsData.length}</p>
                            </div>
                            <div className="overflow-x-auto pb-20">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="hidden md:table-row">
                                            <th>Name</th>
                                            <th>Time</th>
                                            <th>Cancel request</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
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
                                                        <div className="text-sm opacity-50 hidden md:block">{data.sentRequestTo.role}</div>
                                                        <div className="flex gap-2 text-nowrap mt-1 md:hidden">
                                                            <p className="text-xs text-gray-500 text-nowrap">{data.date.split('T')[0]}</p>
                                                            <p className="text-xs text-gray-500 text-nowrap">{data.date.split('T')[1].split('.')[0]}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="md:hidden">
                                                <div className="dropdown dropdown-bottom dropdown-end">
                                                    <div tabIndex={0} role="button" className="m-1 cursor-pointer">
                                                        <BsThreeDots className="text-xl text-gray-600" />
                                                    </div>
                                                    <ul
                                                        tabIndex={0}
                                                        className="dropdown-content menu bg-base-200 rounded-box z-50 w-52 p-2 shadow-lg"
                                                    >
                                                        <li>
                                                            <a onClick={() => handleCancelRequest(data._id)} className="text-gray-700">
                                                                <RxCross2 className="text-xl" />
                                                                Cancel request
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <Link className="text-gray-700" href={`/usersProfile/${data.sentRequestTo.userEmail}`}>
                                                                <MdOutlineRemoveRedEye className="text-xl" />
                                                                View Details
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <div className="flex gap-2 text-nowrap">
                                                    <p className="text-sm text-gray-500 text-nowrap">{data.date.split('T')[0]}</p>
                                                    <p className="text-sm text-gray-500 text-nowrap">{data.date.split('T')[1].split('.')[0]}</p>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <button className="btn btn-sm w-28">
                                                    <span onClick={() => handleCancelRequest(data._id)} className="font-thin	text-sm text-primary">
                                                        Cancel request
                                                    </span>
                                                </button>
                                            </td>
                                            <th className="hidden md:table-cell">
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