/* eslint-disable @next/next/no-img-element */

import { Key } from "react";
import PostDetails from "../postDetails/PostDetails";
import { HiOutlineShoppingCart } from "react-icons/hi";

type Crafts = {
    _id: string,
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

type AllCraftsProps = {
    crafts: Crafts[];
};

const AllCrafts = ({ crafts }:AllCraftsProps) => {

    console.log(crafts)

    return (
        <div>
            <div className="w-[95%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
                {crafts.map((crafts: Crafts, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-sm shadow-xl">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                            {/* user profile image */}
                            <img className="w-10 h-10 rounded-full"
                                alt="user-image"
                                src={crafts.userData.userImage ? crafts.userData.userImage : "/image/user.avif"} />
                            <div>
                                <p className="font-semibold text-start">{crafts.userData.name}</p>
                                <div className="flex gap-2 text-nowrap">
                                    <p className="text-sm text-gray-500 text-nowrap">{crafts.postData.date.split('T')[0]}</p>
                                    <p className="text-sm text-gray-500 text-nowrap">{crafts.postData.date.split('T')[1].split('.')[0]}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <button className="" onClick={() => {
                        const dialogElement = document.getElementById(`my_modal_my_post_${crafts._id}`) as HTMLDialogElement;
                        dialogElement.showModal();
                    }}><span className="">

                            <figure>
                                <img
                                    src={crafts.postData.image}
                                    alt="post"
                                    className="w-full object-cover h-56"
                                />
                            </figure>
                        </span></button>
                    <dialog id={`my_modal_my_post_${crafts._id}`} className="modal">
                        <div className="modal-box w-full max-w-3xl">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                            </form>
                            <PostDetails id={crafts._id} />
                        </div>
                    </dialog>
                    <div className="flex justify-between items-center w-full px-5 py-3 bg-primary text-white">
                        <p>{crafts.postData.price} TK</p>
                        <button className="btn rounded-sm text-gray-600">
                        <HiOutlineShoppingCart className="text-xl text-gray-600" />
                            ADD TO CART
                        </button>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default AllCrafts;