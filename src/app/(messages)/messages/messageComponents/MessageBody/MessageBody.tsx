"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import useFormatDate from "@/app/Hooks/useFormatDate";
import useProfile from "@/app/Hooks/useProfile";
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import { Key, useEffect, useRef } from "react";
import ImageModal from "../ImageModal/ImageModal";

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

interface User {
    image: string
}

const MessageBody = ({ params, user }: { params: Params; user: User }) => {

    console.log(params.id)

    const [profile] = useProfile()
    const { image: userImage } = user
    const { image } = profile
    const [senderMessages, , isLoadingSenderMessages] = useSenderMessages(params.id)
    const [receiverMessages, , isLoadingReceiverMessages] = useReceiverMessages(params.id)
    console.log(senderMessages)

    const { formatDateTime } = useFormatDate()

    const allMessages = [...senderMessages, ...receiverMessages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const lastIndex = allMessages.length - 1
    const lastMessage = allMessages[lastIndex]
    const isSender = senderMessages.some((msg: { _id: string; }) => msg._id === lastMessage?._id)


    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [allMessages]);

    return (
        <div className="w-[95%] mx-auto">
            {isLoadingReceiverMessages && isLoadingSenderMessages
                ? <>
                    <div className="mt-7 flex justify-center items-center">
                        <span className="loading loading-spinner loading-md md:loading-lg"></span>
                    </div>
                </>
                : <>
                    {allMessages.map((msg: Message, index: Key | null | undefined) => (
                        <div key={index} className={senderMessages.includes(msg) ? "chat chat-end" : "chat chat-start"}>
                            <div className="chat-image avatar">
                                <div className="w-7 md:w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src={senderMessages.includes(msg) ? (image || "/image/user.avif") : (userImage || "/image/user.avif")}
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                <time className="text-xs opacity-50">{formatDateTime(msg.createdAt)}</time>
                            </div>
                            {msg?.image && <>
                                <ImageModal msgId={msg._id} msgImage={msg.image}/>
                            </>}
                            {msg?.body &&
                                <div className={`chat-bubble text-sm md:text-base text-nowrap ${senderMessages.includes(msg) ? "bg-primary text-white" : ""}`}>
                                    {msg.body}
                                </div>}
                            <div className="text-xs chat-footer opacity-50">
                                {lastMessage._id === msg._id && (isSender && (lastMessage.seenIds.includes(msg.conversationId) ? "Seen" : "Sent"))}
                            </div>
                        </div>
                    ))}
                    {/* Empty div to scroll to */}
                    <div ref={messagesEndRef}></div>
                </>}

        </div>
    );
};

export default MessageBody;