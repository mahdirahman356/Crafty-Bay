import useFormatDate from "@/app/Hooks/useFormatDate";
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import axios from "axios";
import { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

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

const Messages = ({ msg, params }: { msg: Message, params: Params }) => {

    const [hoveredMessage, setHoveredMessage] = useState<string | null>(null)
    const [copied, setCopied] = useState<boolean>(false)

    const [senderMessages, refetchSenderMessages] = useSenderMessages(params.id)
    const [receiverMessages, refetchReceiverMessages] = useReceiverMessages(params.id)
    const { formatDateTime } = useFormatDate()

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true)
            setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.error(error)
        }
    }

    const handleMessageDelete = async (_id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/messagesApi/api/deleteMessage/${_id}`)
            console.log(res.data)
                refetchSenderMessages()
                refetchReceiverMessages()
            Swal.fire({
                title: "Deleted!",
                text: `Your message has been deleted.`,
                icon: "success"

            })
        } catch (error) {
           console.log(error)
        }
    }

    return (
        <div>
            <div className={`flex ${receiverMessages.includes(msg) && "flex-row-reverse"} items-center gap-2`}
                onMouseEnter={() => setHoveredMessage(msg._id)}
                onMouseLeave={() => setHoveredMessage(null)}>
                <div className='w-5 flex justify-center'>
                    {hoveredMessage === msg._id &&
                        <>
                            <div className={`dropdown ${receiverMessages.includes(msg) ? "dropdown-right" : "dropdown-left"} dropdown-end`}>
                                <div tabIndex={0} role="button" className="">
                                    <PiDotsThreeOutlineVerticalFill className="text-gray-600" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow text-gray-600">
                                    <p className="m-2 p-2 text-xs border-b-[1px] border-gray-400">{formatDateTime(msg.createdAt)}</p>
                                    <li>
                                        <a onClick={() => handleCopy(msg.body)} className="">
                                            {copied
                                                ? <>
                                                    <IoCheckmarkDone className="text-xl" />
                                                    Copied
                                                </>
                                                : <>
                                                    <LuCopy className="text-xl" />
                                                    Copy
                                                </>}
                                        </a>
                                    </li>
                                    {senderMessages.includes(msg)
                                        && <li>
                                            <a onClick={() => handleMessageDelete(msg._id)} className="text-red-500">
                                                <RiDeleteBin5Line className="text-xl" />
                                                Delete Message
                                            </a>
                                        </li>}
                                </ul>
                            </div>
                        </>
                    }
                </div>
                <div className={`chat-bubble text-sm md:text-base text-nowrap ${senderMessages.includes(msg) ? "bg-primary text-white" : ""}`}>
                    {msg.body}
                </div>
            </div>
        </div>
    );
};

export default Messages;