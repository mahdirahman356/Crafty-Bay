/* eslint-disable @next/next/no-img-element */
import { Key } from "react";
import CraftRequestsPostDetails from "../craftRequestsPostDetails/CraftRequestsPostDetails";
import Link from "next/link";   

type Posts = {
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
        location: string;
        date: string;
    };
};

type AllCraftsRequestsProps = {
    craftsRequests: Posts[];
};

const AllCraftRequests = ({ craftsRequests }: AllCraftsRequestsProps) => {
    return (
        <div>
            <div className="w-[95%] md:w-[80%] mx-auto text-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
                {craftsRequests.map((post: Posts, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-sm shadow-xl">
                    <div className="flex justify-between items-start">
                        {/* user profile image */}
                        <Link href={`/craftRequests/buyerUserProfile/${post.email}`}>
                        <div className="flex items-center gap-4 mt-2 mb-6 pl-4">
                            <img className="w-10 h-10 rounded-full object-cover"
                                alt="user-image"
                                src={post.userData.userImage ? post.userData.userImage : "/image/user.avif"} />
                            <div>
                                <p className="font-semibold text-start">{post.userData.name}</p>
                                <div className="flex gap-2 text-nowrap">
                                    <p className="text-sm text-gray-500 text-nowrap">{post.postData.date.split('T')[0]}</p>
                                    <p className="text-sm text-gray-500 text-nowrap">{post.postData.date.split('T')[1].split('.')[0]}</p>
                                </div>
                            </div>
                        </div>

                        </Link>

                    </div>
                    <div className="px-6">
                        <h3 className={`text-gray-600 text-2xl font-semibold mb-3 text-start`}>{post.postData.title}</h3>
                        <p className="mt-2 text-start text-gray-600 text-sm md:text-base">
                            {`${post.postData.description.slice(0, 200)}...`}
                        </p>
                    </div>
                    <button className="" onClick={() => {
                        const dialogElement = document.getElementById(`my_modal_my_CraftRequestsPostDetails_${post._id}`) as HTMLDialogElement;
                        dialogElement.showModal();
                    }}> <div className="my-4 ml-6 flex justify-start">
                            <button className="text-start text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline" >
                                Read more
                            </button>
                        </div>
                    </button>
                    <dialog id={`my_modal_my_CraftRequestsPostDetails_${post._id}`} className="modal">
                        <div className="modal-box w-full max-w-3xl">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                            </form>
                            <CraftRequestsPostDetails id={post._id} />
                        </div>
                    </dialog>
                </div>)}
            </div>
        </div>
    );
};

export default AllCraftRequests;