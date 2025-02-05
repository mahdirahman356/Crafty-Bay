"use client"
import useProfile from "@/app/Hooks/useProfile";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import axios from "axios";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
interface Params {
    id: string
}
const MessageForm = ({ params }: { params: Params }) => {

    const [sending, setSending] = useState(false)

    const [message, setMessage] = useState("")
    const [, refetchSenderMessages] = useSenderMessages(params.id)
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
            refetchSenderMessages()
            setMessage("")
            setSending(false)
        } catch (error) {
            console.log("message sending error", error)
        }
    }

    return (
        <div className="">
            <div className="fixed bottom-0 right-0 left-0 lg:left-60 bg-white p-4 lg:pl-16">
                <form onSubmit={handleMessageForm}>
                    <label className="w-full input input-sm md:input-md input-bordered bg-gray-200 border-none flex items-center gap-2 rounded-3xl">
                        <input
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            type="text"
                            name="message"
                            className="grow text-sm md:text-base"
                            placeholder="Message..."
                            required
                        />
                        <button type="submit" className="md:btn md:btn-sm md:btn-circle btn-primary">
                            {sending
                                ?<span className="loading loading-dots loading-sm text-white"></span>
                                : <IoIosSend className="text-xl text-primary md:text-white" />
                            }
                        </button>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default MessageForm;