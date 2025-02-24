/* eslint-disable @next/next/no-img-element */

import PostDetails from "@/app/components/PostDetails/PostDetails";
import useFormatDate from "@/app/Hooks/useFormatDate";
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import axios from "axios";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoReturnUpForwardOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import Forward from "../Forward/Forward";


type Craft = {
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
}

interface Message {
    _id: string,
    body: string,
    image: string,
    craft: Craft,
    createdAt: string
    conversationId: string
}

interface Params {
    id: string
}



const Craft = ({ msg, params }: { msg: Message, params: Params }) => {

    const { _id, email, userData, postData } = msg.craft || {}
    console.log(postData.title)
    const [, refetchSenderMessages] = useSenderMessages(params.id)
    const [, refetchReceiverMessages] = useReceiverMessages(params.id)


    const { formatDateTime } = useFormatDate()

    const handleMessageDelete = async (_id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/messagesApi/api/deleteMessage/${_id}`)
            console.log(res.data)
            refetchSenderMessages()
            refetchReceiverMessages()
        } catch (error) {
            console.error("Delete Error:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete the message.",
                icon: "error"
            })
        }
    }



    return (
        <div className="flex items-center gap-2">
            <button onClick={() => {
                const modal = document.getElementById(`craft_menu_${msg._id}`) as HTMLDialogElement;
                modal?.showModal();
            }}>
                <BsThreeDotsVertical className="text-xl" />
                <dialog id={`craft_menu_${msg._id}`} className="modal">
                    <div className="modal-box w-auto overflow-hidden">
                        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 text-gray-600">
                            <p className="m-2 p-2 text-xs border-b-[1px] border-gray-400">{formatDateTime(msg.createdAt)}</p>
                            <div>
                                <button className="btn btn-ghost btn-sm px-4 py-2 w-full flex justify-start font-normal items-center gap-2" onClick={() => {
                                    const modal = document.getElementById(`forward_modal_${msg._id}`) as HTMLDialogElement;
                                    modal?.showModal();
                                }}>
                                    <IoReturnUpForwardOutline className="text-xl" />
                                    Forward
                                </button>
                                <dialog id={`forward_modal_${msg._id}`} className="modal modal-top mt-20 w-[98%] md:w-[70%] lg:w-[40%] mx-auto rounded-xl">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <Forward crafts={msg.craft} modalId={`forward_modal_${msg._id}`} msg={undefined} />
                                    </div>
                                </dialog>
                            </div>
                            <li>
                                <a onClick={() => handleMessageDelete(msg._id)} className="text-red-500">
                                    <RiDeleteBin5Line className="text-xl" />
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </button>
            <div>
                <div className="">
                    {/* user profile */}
                    <Link href={`/usersProfile/${email}`}>
                        <div className="flex items-center gap-4 mt-2 mb-6 pl-3">
                            <img
                                className="object-cover w-10 h-10 rounded-full"
                                alt="user-image"
                                src={userData.userImage ? userData.userImage : "/image/user.avif"} />
                            <div>
                                <p className="font-semibold text-start">{userData.name}</p>
                                <div className="flex gap-2 text-nowrap">
                                    <p className="text-sm text-gray-500 text-nowrap">{postData.date.split('T')[0]}</p>
                                    <p className="text-sm text-gray-500 text-nowrap">{postData.date.split('T')[1].split('.')[0]}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <button className="" onClick={() => {
                    const dialogElement = document.getElementById(`my_modal_my_post_${_id}`) as HTMLDialogElement;
                    dialogElement.showModal();
                }}><span className="">
                        <figure>
                            <img
                                src={postData.image}
                                alt="post"
                                className="w-52 md:w-72 object-cover h-56 rounded-xl"
                            />
                        </figure>
                    </span></button>
                <dialog id={`my_modal_my_post_${_id}`} className="modal">
                    <div className="modal-box w-full max-w-3xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                        </form>
                        <PostDetails id={_id} />
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Craft;