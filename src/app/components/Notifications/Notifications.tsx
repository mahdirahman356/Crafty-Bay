/* eslint-disable @next/next/no-img-element */
import useReceivedRequests from "@/app/Hooks/useReceivedRequests";
import useRequestsData from "@/app/Hooks/useRequestsData";
import Link from "next/link";
import { Key } from "react";
import { IoNotificationsOffOutline } from "react-icons/io5";

type Data = {
    requestFrom: {
        userName: string,
        userImage: string,
    },
    sentRequestTo: {
        userName: string,
        userImage: string,
    },
    status: string,
    date: string,
}

const Notifications = () => {

    const [recevedRequestsData, isLoadingRecevedRequests] = useReceivedRequests()
    const [requestsData, , isLoadingRequests] = useRequestsData()



    return (
        <div className="p-2">
            {isLoadingRequests && isLoadingRecevedRequests
                ? <div className="my-6 flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <>
                    {requestsData.length === 0 && recevedRequestsData.length === 0
                        ? <div className="my-4 flex flex-col justify-center items-center gap-2">
                            <IoNotificationsOffOutline className="text-5xl text-gray-700" />
                            <p className="text-gray-700">No Notification</p>
                        </div>
                        : <>
                            {requestsData.map((data: Data, index: Key | null | undefined) =>
                                <div key={index}>
                                    <Link href={"/deshboard/friends/friendRequests"}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                className="object-cover btn-circle w-10 h-10 rounded-full border"
                                                alt="user-image"
                                                src={data.requestFrom.userImage ? data.requestFrom.userImage : "/image/user.avif"} />
                                            <div>
                                                <p className="font-semibold text-start">
                                                    {data.requestFrom.userName}
                                                    <span className="font-normal ml-1">
                                                        sent you a friend request
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)}
                            {recevedRequestsData.map((data: Data, index: Key | null | undefined) =>
                                <div key={index}>
                                    <Link href={"/deshboard/friends/allFriends"}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <img
                                                className="object-cover btn-circle w-10 h-10 rounded-full border"
                                                alt="user-image"
                                                src={data.sentRequestTo.userImage ? data.sentRequestTo.userImage : "/image/user.avif"} />
                                            <div>
                                                <p className="font-semibold text-start">
                                                    {data.sentRequestTo.userName}
                                                    <span className="font-normal ml-1">
                                                        accepted your friend request
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)}
                        </>}

                </>}
        </div>
    );
};

export default Notifications;