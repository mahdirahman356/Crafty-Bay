/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Key, SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPencilMinus } from "react-icons/tb";
import Swal from "sweetalert2";
import { GoDuplicate } from "react-icons/go";
import PostDetails from "@/app/components/PostDetails/PostDetails";
import UpdateCraftRequestsPost from "../updateCraftRequestsPost/UpdateCraftRequestsPost";
import CraftRequestsPostDetails from "@/app/components/CraftRequestsPostDetails/CraftRequestsPostDetails";
import UpdatePosts from "../updatePosts/UpdatePosts";
import { LiaBorderAllSolid } from "react-icons/lia";
import SellerStats from "../SellerStats/SellerStats";
type Post = {
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

interface UserWithRole {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
}


const MyPost = () => {
    const { data: session } = useSession()
    const userWithRole = session?.user as UserWithRole | undefined;
    const { data: myPost = [], refetch, isLoading: craftPostLoading } = useQuery({
        queryKey: ["myPost"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/myPost?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    const { data: craftRequestsPost = [], refetch: refetchCraftRequestsPost, isLoading: craftRequestsPostLoading } = useQuery({
        queryKey: ["craftRequestsPost"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/deshboard/profile/api/myCraftRequestsPost?email=${session?.user?.email}`)
            console.log(data)
            return data
        }
    })

    const handlePostDelete = async (_id: string, craftName: string) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            customClass: {
                confirmButton: 'btn btn-primary rounded-sm text-white ',
                cancelButton: 'btn btn-secondary rounded-sm text-white '
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/deshboard/profile/api/deletePost/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.status === 200) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${craftName} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    const handleCraftRequestsPostDelete = async (_id: string) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            customClass: {
                confirmButton: 'btn btn-primary rounded-sm text-white ',
                cancelButton: 'btn btn-secondary rounded-sm text-white '
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/deshboard/profile/api/deleteCraftRequestsPost/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.status === 200) {
                            refetchCraftRequestsPost()
                            Swal.fire({
                                title: "Deleted!",
                                text: `Post has been deleted.`,
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div>
            {craftPostLoading || craftRequestsPostLoading ?
                <div className="mt-20 flex justify-center items-center">
                    <progress className="progress w-56"></progress>
                </div> :
                <div>
                    <div>
                        {userWithRole?.role === "seller" ?
                            <div>
                                {/* craft posts */}
                                {myPost.length === 0
                                    ? <div className="text-gray-800 flex flex-col gap-4 mt-16 mb-10 justify-center items-center">
                                        <GoDuplicate className='text-8xl' />
                                        <div className="text-center">
                                            <button className="text-blue-500" onClick={() => {
                                                const dialogElement = document.getElementById(`my_modal_add_posts`) as HTMLDialogElement;
                                                dialogElement.showModal();
                                            }}>Add post</button>
                                            <p className="text-gray-600 text-sm md:text-base">You do not add any post yet</p>
                                        </div>
                                    </div>

                                    : <div>
                                        <p className='flex justify-center items-center mt-3'>
                                            <LiaBorderAllSolid className='text-xl' />Posts
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                                            {myPost.map((post: Post, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-sm shadow-xl">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                                                        {/* user profile image */}
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
                                                    {/* dropdown-menu */}
                                                    <div className="dropdown dropdown-bottom dropdown-end mt-1">
                                                        <div tabIndex={0} role="button" className="m-1 pr-3">
                                                            <BsThreeDots className="text-xl" />
                                                        </div>
                                                        <ul tabIndex={0} className="dropdown-content menu shadow-xl bg-base-200 rounded-md z-[1] w-52 p-2">
                                                            <li><a onClick={() => handlePostDelete(post._id, post.postData.craftName)} className="text-gray-500"><RiDeleteBin6Line className="text-xl" />Delete</a></li>
                                                            <li>
                                                                {/* update post modal */}
                                                                <button className="" onClick={() => {
                                                                    const dialogElement = document.getElementById(`update_posts_${post._id}`) as HTMLDialogElement;
                                                                    dialogElement.showModal();
                                                                }}><span className="">
                                                                        <a className="text-gray-500 flex gap-2"><TbPencilMinus className="text-xl" />Update Your Post</a>
                                                                    </span></button>
                                                                <dialog id={`update_posts_${post._id}`} className="modal flex justify-center items-center">
                                                                    <div className="modal-box w-full max-w-3xl">
                                                                        <form method="dialog">
                                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                                                        </form>
                                                                        <UpdatePosts id={post._id} />
                                                                    </div>
                                                                </dialog>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                </div>
                                                <button className="" onClick={() => {
                                                    const dialogElement = document.getElementById(`my_modal_my_post_${post._id}`) as HTMLDialogElement;
                                                    dialogElement.showModal();
                                                }}><span className="">
                                                        <figure>
                                                            <img
                                                                src={post.postData.image}
                                                                alt="post"
                                                                className="w-full h-60 object-cover"
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
                                    </div>}
                            </div>
                            :
                            <div>
                                {/* craft Requests Post */}
                                {craftRequestsPost.length === 0 ?
                                    <div className="flex flex-col gap-4 mt-16 mb-10 justify-center items-center">
                                        <GoDuplicate className='text-8xl' />
                                        <div className="text-center">
                                            <button className="text-blue-500" onClick={() => {
                                                const dialogElement = document.getElementById(`my_modal_add_posts`) as HTMLDialogElement;
                                                dialogElement.showModal();
                                            }}>Add post</button>
                                            <p>You do not add any post yet</p>
                                        </div>
                                    </div> :
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
                                        {craftRequestsPost.map((post: Post, index: Key | null | undefined) => <div key={index} className="card bg-base-100 rounded-sm shadow-xl">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4 mt-2 mb-6 pl-4">
                                                    {/* user profile image */}
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
                                                {/* dropdown-menu */}
                                                <div className="dropdown dropdown-bottom dropdown-end mt-1">
                                                    <div tabIndex={0} role="button" className="m-1 pr-3">
                                                        <BsThreeDots className="text-xl" />
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content menu shadow-xl bg-base-200 rounded-md z-[1] w-52 p-2">
                                                        <li><a onClick={() => handleCraftRequestsPostDelete(post._id)} className="text-gray-500"><RiDeleteBin6Line className="text-xl" />Delete</a></li>
                                                        <li>
                                                            <button className="" onClick={() => {
                                                                const dialogElement = document.getElementById(`update_posts_${post._id}`) as HTMLDialogElement;
                                                                dialogElement.showModal();
                                                            }}><span className="">
                                                                    <a className="text-gray-500 flex gap-2"><TbPencilMinus className="text-xl" />Update Your Post</a>
                                                                </span></button>
                                                            <dialog id={`update_posts_${post._id}`} className="modal flex justify-center items-center">
                                                                <div className="modal-box w-full">
                                                                    <form method="dialog">
                                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                                                                    </form>
                                                                    <UpdateCraftRequestsPost id={post._id} />
                                                                </div>
                                                            </dialog>
                                                        </li>
                                                    </ul>
                                                </div>

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
                                    </div>}
                            </div>
                        }
                    </div>

                </div>}
        </div>
    );
};

export default MyPost;