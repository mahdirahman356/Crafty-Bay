import { TbMessages } from "react-icons/tb";

const page = () => {
    return (
        <div className="text-gray-900">
            <div className="h-[80vh] md:h-screen flex flex-col justify-center items-center">
                <TbMessages className="text-9xl text-primary"/>
                <h3 className="text-center text-xl mt-3 font-bold text-gray-800">Your Messages</h3>
                <p className="text-gray-800 text-sm md:text-base">Send private photos and messages to a friend</p>
            </div>
        </div>
    );
};

export default page;