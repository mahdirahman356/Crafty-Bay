/* eslint-disable @next/next/no-img-element */
"use client"
import useConversation from "@/app/Hooks/useConversation";
import useProfile from "@/app/Hooks/useProfile";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import useUsersList from "@/app/Hooks/useUsersList";
import axios from "axios";
import React, { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
interface Params {
    id: string
}
const MessageForm = ({ params }: { params: Params }) => {

    const [sending, setSending] = useState(false)
    const [message, setMessage] = useState("")
    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const imageRef = useRef<HTMLInputElement | null>(null)

    const [, refetchSenderMessages] = useSenderMessages(params.id)
    const [, refetchUserList] = useUsersList()
    const [, refetchConversation] = useConversation()
    const [profile] = useProfile()
    const { _id } = profile || {}

    const handleMessageForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSending(true)
        console.log(message)
        const messageData = {
            body: message,
            createdAt: new Date(),
            conversationId: params.id,
            senderId: _id,
            seenIds: [_id]
        }
        console.log(messageData)

        try {
            const res = await axios.post("http://localhost:3000/messagesApi/api/sendMessage", messageData)
            console.log(res.data)
            await refetchConversation()
            await refetchUserList()
            await refetchSenderMessages()
            setMessage("")
            setSending(false)
        } catch (error) {
            console.log("message sending error", error)
        }
    }

    const handleimageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fileInput = imageRef.current
        const file = fileInput?.files?.[0]
        if (file) {
            setSelectedImg(URL.createObjectURL(file))
        } else {
            console.error('No file selected');
        }
    }

    const handleCancelSelectedImg = () => {
        setSelectedImg(null)
    }

    const handleSentImage = () => {

    }

    return (
        <div className="">
            <div className="fixed bottom-0 right-0 left-0 lg:left-60 bg-white p-4 lg:pl-16">
                <form
                    className={`w-full input input-sm md:input-md input-bordered bg-gray-200 border-none flex justify-between items-center gap-2 rounded-3xl ${selectedImg ? "min-h-28" : ""}`}
                    onSubmit={handleMessageForm}>
                    <label>
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            type="text"
                            name="message"
                            className={`${selectedImg && "hidden"} grow text-sm md:text-base`}
                            placeholder="Message..."
                            required
                        />
                        {selectedImg &&
                        <div className="relative">
                            <button onClick={handleCancelSelectedImg} className="btn btn-xs btn-circle absolute left-[68px] bottom-[68px]">
                                <RxCross2 />
                            </button>
                            <img
                                src={selectedImg && selectedImg} alt="profile"
                                width={400}
                                height={300}
                                className='object-cover rounded-lg w-20 h-20'
                            />
                        </div>
                    }
                    </label>
                    <div className="flex justify-center items-center gap-2 md:gap-4">
                        <label>
                            <div>
                                <IoImageOutline className="text-xl md:text-3xl lg:text-4xl text-primary" />
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                name="img"
                                accept="image/*"
                                ref={imageRef}
                                onChange={handleimageChange}
                            />
                        </label>
                        <button type="submit" className="md:btn md:btn-sm md:btn-circle btn-primary">
                            {sending
                                ? <span className="loading loading-dots loading-sm text-white"></span>
                                : <IoIosSend className="text-xl text-primary md:text-white" />
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default MessageForm;