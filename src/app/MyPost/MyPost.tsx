/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Key } from "react";
import Image from 'next/image';
import PostDetails from "../postDetails/PostDetails";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPencilMinus } from "react-icons/tb";

type Post = {
    _id: string,
    userData: {
        userImage: string;
        name: string;
    };
    postData: {
        title: string;
        description: string;
        price: string;
        location: string;
        image: string;
        date: string;
    };
};

const MyPost = () => {
    const { data: session } = useSession()
    const { data: myPost = [] } = useQuery({
        queryKey: ["myPost"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/myPost?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                {myPost.map((post: Post, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-lg shadow-xl">
                <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                                    {/* user profile image */}
                                    <Image className="w-10 h-10 rounded-full"
                                        alt="user-image"
                                        width={400}
                                        height={300}
                                        src={post.userData.userImage ? post.userData.userImage : "/image/user.avif"} />
                                    <div>
                                        <p className="font-semibold text-start">{post.userData.name}</p>
                                        <div className="flex gap-3">
                                            <p className="text-sm text-gray-500">{post.postData.date.split('T')[0]}</p>
                                            <p className="text-sm text-gray-500">{post.postData.date.split('T')[1].split('.')[0]}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* dropdown-menu */}
                                <div className="dropdown dropdown-bottom dropdown-end">
                                    <div tabIndex={0} role="button" className="m-1 pr-3">
                                    <BsThreeDots className="text-xl"/>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu shadow-xl bg-base-200 rounded-md z-[1] w-52 p-2">
                                        <li><a className="text-gray-500"><RiDeleteBin6Line className="text-xl"/>Delete</a></li>
                                        <li><a className="text-gray-500"><TbPencilMinus className="text-xl" />Update Your Post</a></li>
                                    </ul>
                                </div>

                            </div>
                    <button className="" onClick={() => {
                        const dialogElement = document.getElementById(`my_modal_my_post_${post._id}`) as HTMLDialogElement;
                        dialogElement.showModal();
                    }}><span className="">
                           
                            <figure>
                                <Image
                                    src={"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                                    alt="post"
                                    width={400}
                                    height={300}
                                />
                            </figure>
                        </span></button>
                    <dialog id={`my_modal_my_post_${post._id}`} className="modal">
                        <div className="modal-box w-full max-w-3xl">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                            </form>
                            <PostDetails id={post._id} />
                        </div>
                    </dialog>
                </div>)}
            </div>
        </div>
    );
};

export default MyPost;