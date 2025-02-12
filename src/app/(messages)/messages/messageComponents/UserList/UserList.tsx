"use client"
import useProfile from "@/app/Hooks/useProfile";
import useReceiverMessages from "@/app/Hooks/useReceiverMessages";
import useSenderMessages from "@/app/Hooks/useSenderMessages";
import axios from "axios";
import Link from "next/link";
import { MdOutlineInsertPhoto } from "react-icons/md";

/* eslint-disable @next/next/no-img-element */
type Users = {
    _id: string
    name: string,
    image: string
}

const UserList = ({ users }: { users: Users }) => {

    const [profile] = useProfile()
    const {_id} = profile || {}

    const [receiverMessages] = useReceiverMessages(users._id)
    const [senderMessages] = useSenderMessages(users._id)

    const allMessages = [...receiverMessages, ...senderMessages]
    const lastMessage = [...allMessages].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

    const isSender = senderMessages.some((msg: { _id: string; }) => msg._id === lastMessage?._id)

    const handleSeenMessage = async() => {
        try {
            const res = await axios.patch(`http://localhost:3000/messagesApi/api/seenMessage?senderId=${users._id}&receiverId=${_id}`)
            console.log(res.data)
        } catch (error) {
            
        }
    }

    return (
        <div>
            <Link href={`/messages/conversation/${users._id}`} onClick={handleSeenMessage}>
                <div className="flex items-center gap-4">
                    <img
                        className="object-cover w-10 h-10 rounded-full"
                        alt="user-image"
                        src={users.image ? users.image : "/image/user.avif"} />
                    <div>
                        <p className="font-semibold text-nowrap">{users.name}</p>
                        <p className={`${!isSender && (lastMessage?.seenIds?.includes(lastMessage?.conversationId) ? "font-thin" : "font-semibold text-gray-700")} text-xs text-gray-500`}>
                            { lastMessage ? 
                            (isSender ? 
                            (lastMessage.seenIds.includes(lastMessage.conversationId) 
                            ? "Seen message" 
                            : "Sent message") 
                            : (lastMessage.image 
                            ? <span className="flex items-center gap-1"><MdOutlineInsertPhoto /> Photo</span> 
                            : <>{lastMessage.body.slice(0,20)}...</>)) 
                            : "Message"}
                        </p>
                    </div>
                </div>
            </Link>


        </div>
    );
};

export default UserList;