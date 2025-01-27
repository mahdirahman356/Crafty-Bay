"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useRequestsData from "@/app/Hooks/useRequestsData";
import useSentRequestsData from "@/app/Hooks/useSentRequestsData";
import { TbUsers } from "react-icons/tb";

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
    
    const [requestsData] = useRequestsData()
    const [sentRequestsData] = useSentRequestsData()


    const filteredRequestsData: Data[] = requestsData.filter((requests: Data) => requests.status === "friends") ?? []
    const filteredSentRequestsData: Data[] = sentRequestsData.filter((requests: Data) => requests.status === "friends") ?? []

    const allFriends = filteredRequestsData.concat(filteredSentRequestsData)

    console.log(allFriends)



    return (
        <div className="md:w-[95%] mx-auto">
            <div className="h-[80vh] text-gray-800 flex flex-col gap-4 justify-center items-center">
                <TbUsers className='text-8xl' />
                <div className="text-center">
                        <p className="">Add Friends</p>
                    <p className="text-gray-600 text-sm md:text-base">Send a request to connect with your friends</p>
                </div>
            </div>
        </div>
    );
};

export default page;