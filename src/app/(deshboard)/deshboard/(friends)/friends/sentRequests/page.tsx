/* eslint-disable react/no-unescaped-entities */
import { RiUserSharedLine } from "react-icons/ri";

const page = () => {
    return (
        <div className="md:w-[95%] mx-auto">
            <div className="h-[80vh] text-gray-800 flex flex-col gap-4 justify-center items-center">
                <RiUserSharedLine className='text-8xl' />
                <div className="text-center">
                    <p className="">No sent requests</p>
                    <p className="text-gray-600 text-sm md:text-base">You don't sent any friend requests</p>
                </div>
            </div>
        </div>
    );
};

export default page;