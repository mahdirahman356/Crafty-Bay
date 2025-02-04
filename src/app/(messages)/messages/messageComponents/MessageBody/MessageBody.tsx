/* eslint-disable @next/next/no-img-element */
import useProfile from "@/app/Hooks/useProfile";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import { Key } from "react";

interface Message {
    body: string,
    createdAt: string
}

const MessageBody = () => {

    const [senderMessages] = useSenderMessages()
    const [profile] = useProfile()
    const { image } = profile

    console.log(senderMessages)

    return (
        <div className="w-[95%] mx-auto">
            {senderMessages.map((msg: Message, index: Key | null | undefined) => <div key={index} className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-7 md:w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={image ? image : "/image/user.avif"} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">12:30 pm</time>
                </div>
                <div className="chat-bubble text-sm md:text-base bg-primary text-white">{msg.body}</div>
                <div className="text-xs chat-footer opacity-50">Seen</div>
            </div>)}

        </div>
    );
};

export default MessageBody;