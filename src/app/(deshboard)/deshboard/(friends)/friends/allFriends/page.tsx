"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TbUsers } from "react-icons/tb";

const page = () => {
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