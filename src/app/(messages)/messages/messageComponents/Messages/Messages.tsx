import useFormatDate from "@/app/Hooks/useFormatDate";
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import axios from "axios";
import { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
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
                icon: "success",
                customClass: {
                    confirmButton: 'btn btn-primary rounded-sm text-white ', 
                  },

            })
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
        <div>
            <button className={`flex ${receiverMessages.includes(msg) && "flex-row-reverse"} items-center gap-2`}
                onClick={() => {
                    const modal = document.getElementById(`message_menu_${msg._id}`) as HTMLDialogElement;
                    modal?.showModal();
                }}>
                <div className={`chat-bubble text-sm md:text-base text-wrap max-w-52 md:max-w-72 break-words ${senderMessages.includes(msg) ? "bg-primary text-white" : ""}`}>
                    {msg.body}
                </div>
                <dialog id={`message_menu_${msg._id}`} className="modal">
                    <div className="modal-box w-auto">
                        <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 text-gray-600">
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
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </button>
        </div>
    );
};

export default Messages;