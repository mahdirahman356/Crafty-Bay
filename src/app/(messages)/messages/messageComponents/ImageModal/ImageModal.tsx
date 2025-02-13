/* eslint-disable @next/next/no-img-element */
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import axios from "axios";
import { RiDeleteBinLine, RiShareForward2Fill } from "react-icons/ri";
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

    const [refetchReceiverMessages] = useReceiverMessages(params.id)
    const [senderMessages, refetchSenderMessages] = useSenderMessages(params.id)

    const handleDeleteImage = async (_id: string) => {
        try {
            const res = await axios.delete(`http://localhost:3000/messagesApi/api/deleteMessage/${_id}`)
            if (res.data) {
                await refetchSenderMessages();
                await refetchReceiverMessages()
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    }

    return (
        <div>
            <button className="" onClick={() => {
                const modal = document.getElementById(`my_modal_photo_${msg._id}`) as HTMLDialogElement;
                modal?.showModal();
            }}>
                <img className="w-32 h-32 mb-3 object-cover rounded-lg" src={msg.image} alt="image" />
            </button>
            <dialog id={`my_modal_photo_${msg._id}`} className="modal">
                <div className={`!p-0 !bg-transparent mx-2 overflow-hidden`}>
                    <div className="absolute right-2 lg:right-20 top-8 text-black flex items-center gap-2">
                        <div>
                            <button className="btn btn-sm btn-circle" onClick={() => {
                                const modal = document.getElementById(`forward_modal_${msg._id}`) as HTMLDialogElement;
                                modal?.showModal();
                            }}>
                                <RiShareForward2Fill className="text-xl" />
                            </button>
                            <dialog id={`forward_modal_${msg._id}`} className="modal modal-top mt-20 w-[98%] md:w-[70%] lg:w-[40%] mx-auto rounded-xl">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <Forward msg={msg} modalId={`forward_modal_${msg._id}`} />
                                </div>
                            </dialog>
                        </div>
                        {senderMessages.includes(msg)
                            && <button onClick={() => handleDeleteImage(msg._id)} className="btn btn-sm btn-circle">
                                <RiDeleteBinLine className="text-xl" />
                            </button>}
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

export default ImageModal