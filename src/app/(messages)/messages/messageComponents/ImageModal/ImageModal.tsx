/* eslint-disable @next/next/no-img-element */
import useFormatDate from "@/app/Hooks/useFormatDate";
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import axios from "axios";
import { useState } from "react";
import { CgMailForward } from "react-icons/cg";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";
import Forward from "../Forward/Forward";

interface Message {
    _id: string,
    body: string,
    image: string,
    createdAt: string
    conversationId: string
}

interface Params {
    id: string
}

const ImageModal = ({ msg, params }: { msg: Message, params: Params }) => {

    const [hoveredImage, setHoveredImage] = useState<string | null>(null)
    const [receiverMessages, refetchReceiverMessages] = useReceiverMessages(params.id)
    const [senderMessages, refetchSenderMessages] = useSenderMessages(params.id)

    const handleDeleteImage = async (_id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/messagesApi/api/deleteMessage/${_id}`)
            console.log(res.data)
            await refetchSenderMessages();
            await refetchReceiverMessages()
            Swal.fire({
                title: "Deleted!",
                text: `Your message has been deleted.`,
                icon: "success"

            })
        } catch (error) {
            console.log(error)
        }
    }

    const { formatDateTime } = useFormatDate()

    return (
        <div>
            <div>
                <div className={`flex ${receiverMessages.includes(msg) && "flex-row-reverse"} items-center gap-2`}
                    onMouseEnter={() => setHoveredImage(msg._id)}
                    onMouseLeave={() => setHoveredImage(null)}>
                    <div className='w-5 flex justify-center'>
                        {hoveredImage === msg._id &&
                            <>
                                <div className={`dropdown ${receiverMessages.includes(msg) ? "dropdown-right" : "dropdown-left"} dropdown-end`}>
                                    <div tabIndex={0} role="button" className="">
                                        <PiDotsThreeOutlineVerticalFill className="text-gray-600" />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow text-gray-600">
                                        <p className="m-2 p-2 text-xs border-b-[1px] border-gray-400">{formatDateTime(msg.createdAt)}</p>
                                        <li>
                                            <a>
                                                <button className="" onClick={() => {
                                                    const modal = document.getElementById(`forward_modal_${msg._id}`) as HTMLDialogElement;
                                                    modal?.showModal();
                                                }}>
                                                    <span className="flex items-center gap-2">
                                                        <CgMailForward className="text-xl" />
                                                        Forward
                                                    </span>
                                                </button>
                                                <dialog id={`forward_modal_${msg._id}`} className="modal modal-top mt-20 w-[98%] md:w-[70%] lg:w-[40%] mx-auto rounded-xl">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <Forward msg={msg} modalId={`forward_modal_${msg._id}`} />
                                                    </div>
                                                </dialog>
                                            </a>
                                        </li>
                                        {senderMessages.includes(msg)
                                            && <li>
                                                <a onClick={() => handleDeleteImage(msg._id)} className="text-red-500">
                                                    <RiDeleteBin5Line className="text-xl" />
                                                    Delete
                                                </a>
                                            </li>}
                                    </ul>
                                </div>
                            </>
                        }
                    </div>

                    <button className="" onClick={() => {
                        const modal = document.getElementById(`my_modal_photo_${msg._id}`) as HTMLDialogElement;
                        modal?.showModal();
                    }}>
                        <img className="w-32 h-32 mb-3 object-cover rounded-lg" src={msg.image} alt="image" />
                    </button>
                </div>

            </div>
            <dialog id={`my_modal_photo_${msg._id}`} className="modal">
                <div className={`!p-0 !bg-transparent mx-2 overflow-hidden`}>
                    <div className="absolute right-2 lg:right-20 top-8 text-black">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle">
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="">
                        <img className="object-cover rounded-xl" src={msg.image} alt="image" />
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ImageModal;