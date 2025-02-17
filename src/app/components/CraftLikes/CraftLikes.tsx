/* eslint-disable @next/next/no-img-element */

import useCraftLikes from "@/app/Hooks/useCraftLikes";
import Link from "next/link";
import { Key } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";

type Crafts = {
    _id: string,
    email: string,
    userData: {
        userImage: string;
        name: string;
    };
    postData: {
        craftName: string;
        title: string;
        description: string;
        price: string;
        location: string;
        image: string;
        date: string;
    };
};

type Likes = {
    userData: {
        userId: string,
        email: string,
        name: string,
        image: string,
    }
}

const CraftLikes = ({ crafts }: { crafts: Crafts }) => {

    const [likes, , isLoadinglikes] = useCraftLikes(crafts._id)

    return (
        <div>
            <h2 className="font-semibold text-center my-2 text-2xl">Likes</h2>
            {isLoadinglikes
                ? <div className="my-14 flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div>
                : <>
                    {likes && likes.length > 0
                        ? <>
                            {likes.map((likes: Likes, index: Key | null | undefined) => <div key={index} className="flex items-center gap-4 mt-2 mb-6">
                                <Link href={`/usersProfile/${likes.userData.email}`}>
                                    <div className="relative">
                                        <img className="w-10 h-10 object-cover rounded-full border"
                                            alt="user-img"
                                            src={likes.userData.image ? likes.userData.image : "/image/user.avif"} />
                                        <div className="absolute -bottom-1 right-0 p-1 bg-white rounded-full">
                                            <IoIosHeart className="text-sm text-red-500" />
                                        </div>
                                    </div>
                                </Link>
                                <div>
                                    <p className="font-semibold text-start">{likes.userData.name}</p>
                                </div>
                            </div>)}
                        </>
                        : <div className="my-16 flex gap-2 flex-col justify-center items-center">
                            <FaHandHoldingHeart className="text-4xl" />
                            <p className="text-gray-500 text-center text-sm">No likes yet</p>
                        </div>}

                </>}

        </div>
    );
};

export default CraftLikes;